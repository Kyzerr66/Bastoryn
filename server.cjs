'use strict';
// No dependencies. A private LAN relay; the room host owns the game simulation.
const http=require('node:http'), fs=require('node:fs'), path=require('node:path'), os=require('node:os'), crypto=require('node:crypto');
const PORT=Number(process.env.PORT)||Number(process.argv[process.argv.indexOf('--port')+1])||8787,HOST=process.env.HOST||'0.0.0.0';
const rooms=new Map(), allowedMaps=new Set(['aube','delta','fjord','dunes','caldeira','cite','jungle','atoll','cimes','toundra','automne','canyon','baie','peninsule','glacier','rempart']);
// Read map identifiers from the bundled game to keep the server in sync.
const html=fs.readFileSync(path.join(__dirname,'dist','index.html'));
const mapChunk=html.toString().split('const MAPS = [')[1]?.split('];')[0]||'';for(const m of mapChunk.matchAll(/id: '([^']+)'/g))allowedMaps.add(m[1]);
const token=()=>crypto.randomBytes(24).toString('base64url');
const publicRoom=r=>({code:r.code,config:r.config,capacity:r.capacity,started:r.started,players:r.players.map(p=>p?{id:p.id,name:p.name,friendId:p.friendId,ready:p.ready,connected:!!p.stream}:null)});
const emit=(p,m)=>{if(!p?.stream)return;try{if(p.stream.writableLength>2e6){p.stream.end();p.stream=null;return;}p.stream.write('data: '+JSON.stringify(m)+'\n\n');}catch{p.stream=null;}};
const broadcast=(r,m,skip=-1)=>r.players.forEach((p,i)=>{if(i!==skip)emit(p,m);});
const roster=r=>broadcast(r,{type:'room',room:publicRoom(r)});
const player=(id,name,friendId)=>({id,name:String(name||'Commandant').trim().slice(0,24)||'Commandant',friendId:/^OW-[A-Z0-9]{6}$/.test(friendId)?friendId:'',token:token(),ready:false,stream:null,last:Date.now(),rate:[]});
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
function parse(req){return new Promise((resolve,reject)=>{let data='',size=0;req.on('data',b=>{size+=b.length;if(size>1800000){reject(Error('Requête trop volumineuse'));req.destroy();}else data+=b;});req.on('end',()=>{try{resolve(JSON.parse(data||'{}'));}catch{reject(Error('JSON invalide'));}});});}
function auth(data){const r=rooms.get(data.room);if(!r)throw Error('Salon introuvable');const p=r.players.find(p=>p&&p.token===data.token);if(!p)throw Error('Accès refusé');r.last=p.last=Date.now();return {r,p};}
const server=http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://localhost');
    // Same-origin browser access. No wildcard CORS or external account data.
    if(req.headers.origin){const origin=new URL(req.headers.origin);if(origin.host!==req.headers.host)return json(res,403,{error:'Origine refusée'});}
    if(req.method==='GET'&&u.pathname==='/api/health')return json(res,200,{ok:true,version:'frontieres-1'});
    if(req.method==='GET'&&u.pathname==='/api/events'){
      const {r,p}=auth({room:u.searchParams.get('room'),token:u.searchParams.get('token')});
      p.stream?.end();p.stream=res;res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write(': connected\n\n');
      const heartbeat=setInterval(()=>{try{res.write(': heartbeat\n\n');p.last=r.last=Date.now();}catch{}},12000);
      req.on('close',()=>{clearInterval(heartbeat);if(p.stream===res){p.stream=null;p.last=Date.now();roster(r);}});
      roster(r);if(r.started){emit(p,{type:'start',config:r.startConfig});if(r.state)emit(p,{type:'state',data:r.state});}return;
    }
    if(req.method==='POST'&&u.pathname.startsWith('/api/')){
      const data=await parse(req);
      if(u.pathname==='/api/create'){
        if(rooms.size>=50)return json(res,429,{error:'Trop de salons actifs'});
        const c=data.config||{};if(!['coop','duel','duo','ffa'].includes(c.mode)||!allowedMaps.has(c.map)||!Number.isInteger(c.diff)||c.diff<0||c.diff>3)return json(res,400,{error:'Configuration invalide'});
        const capacity=c.mode==='duel'?2:4;let code;do{code=crypto.randomBytes(4).toString('hex').slice(0,6).toUpperCase();}while(rooms.has(code));const p=player(0,data.name,data.friendId);
        const r={code,config:{mode:c.mode,map:c.map,diff:c.diff,count:Math.max(1,Math.min(4,c.count||4))},capacity,players:[p],started:false,last:Date.now(),state:null};rooms.set(code,r);return json(res,200,{room:publicRoom(r),token:p.token,self:0});
      }
      if(u.pathname==='/api/join'){
        const r=rooms.get(String(data.code).toUpperCase());if(!r)return json(res,404,{error:'Code introuvable. Vérifie le serveur et le code.'});if(r.started)return json(res,409,{error:'La partie a déjà commencé'});
        let i=r.players.findIndex(p=>p===null);if(i<0)i=r.players.length;if(i>=r.capacity)return json(res,409,{error:'Salon complet'});const p=player(i,data.name,data.friendId);r.players[i]=p;roster(r);return json(res,200,{room:publicRoom(r),token:p.token,self:i});
      }
      if(u.pathname==='/api/send'){
        const {r,p}=auth(data),type=data.type,msg=data.data||{};
        p.rate=p.rate.filter(t=>Date.now()-t<1000);if(p.rate.length>40)return json(res,429,{error:'Trop d’actions'});p.rate.push(Date.now());
        if(type==='ready'){if(r.started)throw Error('Partie déjà en cours');p.ready=!p.ready;roster(r);}
        else if(type==='start'){
          if(p.id!==0)throw Error('Seul l’hôte démarre la partie');if(r.started)throw Error('Partie déjà démarrée');
          const required=r.config.mode==='coop'?2:r.capacity;if(r.players.filter(Boolean).length<required)throw Error('Il faut '+required+' joueurs pour ce mode');if(r.players.some(p=>!p||!p.ready||!p.stream))throw Error('Tous les joueurs doivent être connectés et prêts');
          r.started=true;r.startConfig={...r.config,players:r.players.map(p=>({id:p.id,name:p.name,bot:false}))};broadcast(r,{type:'start',config:r.startConfig});
        }
        else if(type==='command'){if(!r.started)throw Error('Partie non démarrée');if(!['place','upgrade','sell','target','annex','repair','ability','wave','attack'].includes(msg.k))throw Error('Action invalide');emit(r.players[0],{type:'command',from:p.id,data:msg});}
        else if(type==='state'){if(p.id!==0||!r.started)throw Error('État réservé à l’hôte');r.state=msg;broadcast(r,{type:'state',data:msg},0);}
        else if(type==='notice'){if(p.id!==0)throw Error('Action réservée à l’hôte');emit(r.players[msg.to],{type:'notice',data:msg});}
        else if(type==='leave'){if(p.id===0){broadcast(r,{type:'closed'});r.players.forEach(p=>p?.stream?.end());rooms.delete(r.code);}else{p.stream?.end();p.stream=null;if(!r.started)r.players[p.id]=null;roster(r);}}
        else throw Error('Message inconnu');return json(res,200,{ok:true});
      }
      return json(res,404,{error:'Route inconnue'});
    }
    if(req.method==='GET'&&(u.pathname==='/'||u.pathname==='/index.html')){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});return res.end(html);}
    json(res,404,{error:'Introuvable'});
  }catch(e){if(!res.headersSent)json(res,400,{error:e.message});else res.end();}
});
server.listen(PORT,HOST,()=>{console.log('\nOWNED — Frontières | Serveur privé\n');console.log('Sur ce PC : http://localhost:'+PORT);let interfaces={};try{interfaces=os.networkInterfaces();}catch{}for(const list of Object.values(interfaces))for(const n of list||[])if(n.family==='IPv4'&&!n.internal)console.log('Pour tes amis sur le même réseau : http://'+n.address+':'+PORT);if(process.argv.includes('--open')){const url='http://localhost:'+PORT;const child=require('node:child_process').spawn(process.platform==='win32'?'cmd':process.platform==='darwin'?'open':'xdg-open',process.platform==='win32'?['/c','start','',url]:[url],{stdio:'ignore',detached:true});child.on('error',()=>{});child.unref();}console.log('\nGarde cette fenêtre et l’onglet hôte ouverts. Ctrl+C pour arrêter.\n');});
server.on('error',e=>{console.error('Impossible de démarrer : '+e.message);process.exitCode=1;});
setInterval(()=>{const now=Date.now();for(const [code,r] of rooms){if(now-r.last>1800000||(!r.players[0]?.stream&&now-r.players[0].last>45000)){broadcast(r,{type:'closed'});r.players.forEach(p=>p?.stream?.end());rooms.delete(code);}}},15000).unref();
