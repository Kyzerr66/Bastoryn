# OWNED — Jouer à plusieurs

Le jeu possède quatre modes : coopération à 2–4 humains, duel à 2, 2 contre 2 à 4, et chacun pour soi à 4. Le solo et les équipes avec IA restent disponibles dans **Escarmouche**.

**Choisis ton cas :** si vous êtes sur le même Wi-Fi, suis la méthode 1. Si tes amis sont chez eux, suis la méthode 2. Dans les deux cas, tous les joueurs doivent ouvrir le jeu à la **même adresse de serveur**.

## La réponse simple pour Netlify

- **HTML déposé sur Netlify : solo et adversaires IA.** Le multijoueur entre appareils ne fonctionne pas avec ce dépôt seul.
- **Amis chez eux : mets le dossier complet du ZIP sur Render, en service web Node.** Puis partage son adresse publique. La méthode 2 ci-dessous explique les boutons et réglages.
- **Amis dans la même maison : lance le fichier Windows du ZIP sur un PC.** Tout le monde ouvre l’adresse réseau affichée. Suis la méthode 1.

Une fois le jeu ouvert à la même adresse pour tous : **Combat → Amis & salons → Créer un salon → partager le code → chaque joueur clique « Je suis prêt » → l’hôte lance la partie.**

Il n’y a encore aucun serveur public créé pour ce jeu. Un code de salon seul ne relie pas des joueurs qui ont ouvert des copies indépendantes du HTML.

## 1. Sur le même Wi-Fi — le plus rapide

### Préparer le PC hôte (Windows)

1. Télécharge `OWNED_Frontieres_3D_Multijoueur.zip` puis fais **clic droit → Extraire tout**. N’ouvre pas le lanceur directement dans l’archive.
2. Installe la version **LTS** de [Node.js](https://nodejs.org/fr/download) pour Windows si elle n’est pas déjà installée. Les autres joueurs n’ont pas besoin d’installer Node.js.
3. Dans le dossier extrait, double-clique sur **OUVRIR_MULTIJOUER.bat**. Le serveur démarre puis ouvre le jeu. Garde sa fenêtre ouverte.
4. Si le navigateur ne s’ouvre pas automatiquement, tape `http://localhost:8787` dans sa barre d’adresse.
5. Dans la fenêtre du serveur, repère **« Pour tes amis sur le même réseau »**. L’adresse ressemble à `http://192.168.1.25:8787` : c’est un exemple, utilise celle affichée chez toi.
6. **Toi et tes amis ouvrez cette adresse réseau**, sur PC ou téléphone connecté au même Wi-Fi. Tu pourras alors copier un lien d’invitation utilisable par tout le groupe.

Un lien contenant `localhost` mène à l’appareil de celui qui l’ouvre : il ne faut pas l’envoyer à tes amis. Si Windows demande une autorisation, autorise Node.js sur ton réseau privé. Il n’est pas nécessaire de désactiver le pare-feu.

Sur macOS/Linux : dans le dossier extrait, exécute `node server.cjs`, puis ouvre l’adresse affichée. Le script `ouvrir-multijoueur.sh` est également fourni.

### Créer et rejoindre le salon

1. Ouvre **Combat → Amis & salons**, puis saisis ton pseudo.
2. Clique **Créer un salon**. Choisis le mode, la carte et la difficulté, puis **Créer un salon amis**.
3. Transmets le **code à 6 caractères** ou le **lien d’invitation** affiché dans le salon.
4. Tes amis ouvrent le même serveur, vont dans **Amis & salons**, saisissent le code puis cliquent **Rejoindre**. Le lien préremplit le code ; ils doivent quand même rejoindre.
5. Chaque joueur clique **Je suis prêt**. Quand toutes les places nécessaires sont remplies, l’hôte clique **Lancer la partie**.
6. Laisse la fenêtre du serveur **et l’onglet du joueur hôte** ouverts pendant la partie. Pour arrêter le serveur après la partie : `Ctrl+C` dans sa fenêtre.

| Mode | Humains dans le salon | Organisation |
|---|---:|---|
| Coopération | 2, 3 ou 4 | Une citadelle et une réserve d’énergie partagées |
| 1 contre 1 | 2 | Une citadelle par joueur |
| 2 contre 2 | 4 | Places 1–2 contre places 3–4 |
| Chacun pour soi | 4 | Quatre citadelles adverses |

Le carnet d’amis est enregistré sur chaque appareil. Ajouter un identifiant ne transmet pas d’invitation : partage toi-même le lien ou le code du salon.

## 2. À distance — chacun chez soi

**Le dépôt du HTML seul sur Netlify ne démarre pas le serveur multijoueur fourni.** Pour cette version, héberge le jeu complet sur un service Node.js ; tes amis utiliseront son adresse publique. Le serveur est déjà dans le ZIP. Aucun service public n’a été créé automatiquement.

Une possibilité pour tester est **Render**, qui propose des services web Node.js. Les réglages ci-dessous concernent le projet fourni, sans dépendance externe à installer dans son code.

1. Extrais le ZIP. Crée un dépôt GitHub, puis ajoute les fichiers du projet en conservant le dossier `dist` et son `index.html`. À la racine du dépôt, il faut notamment `package.json`, `server.cjs` et `dist/`.
2. Ouvre ton compte Render, clique **New → Web Service**, puis connecte ce dépôt. Choisis bien un service web qui exécute Node.js.
3. Renseigne les valeurs suivantes :

| Réglage Render | Valeur |
|---|---|
| Language / Runtime | Node |
| Branch | La branche contenant tes fichiers |
| Root Directory | Vide si `package.json` est à la racine |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |
| Instance | Free pour un essai, si proposé à ton compte |

4. Lance **Create Web Service**, puis attends la fin du déploiement. Le programme utilise automatiquement le port fourni par l’hébergeur.
5. Ouvre l’adresse **HTTPS** attribuée par Render. Tous les joueurs doivent utiliser cette même adresse, puis suivre les étapes « Créer et rejoindre le salon » ci-dessus.
6. Sur cette version hébergée, tu n’as plus besoin de lancer le fichier `.bat` chez toi. L’onglet du joueur hôte doit toujours rester ouvert : il simule la partie.

Le plan gratuit sert aux essais : mise en veille après 15 minutes sans trafic entrant, redémarrage pouvant prendre environ une minute et quotas d’utilisation. Un redémarrage du serveur supprime les salons en cours ; il faut en créer un nouveau. Vérifie le plan et les conditions affichés au moment de la création. Le serveur fourni est prévu pour des parties privées entre amis, sans classement protégé contre la triche.

## 3. Pendant la partie

- **Territoires :** les 3 zones proches du château sont gratuites au début de chaque partie. Clique **Territoires** ou une zone sur la carte, puis **Acheter la zone**. Le prix en énergie et en influence est affiché avant l’achat. L’achat autorise la construction et augmente le revenu par vague. Les coéquipiers partagent les zones achetées ; les équipes adverses gardent leurs propres territoires.
- Le socle entier de la défense doit tenir dans des zones disponibles. Les routes, l’eau, les bâtiments et les autres socles restent interdits.

- Chaque équipe défend une carte identique. Les coéquipiers partagent leur énergie et leur citadelle, mais chacun améliore ou vend ses propres défenses.
- Les vagues se synchronisent automatiquement ; l’hôte peut avancer leur lancement quand tous les fronts sont prêts.
- En opposition, **Envoyer un assaut** coûte **80 énergie**, envoie 4 fantassins et 1 blindé et se recharge en 18 secondes.
- Les touches **1–6** sélectionnent les défenses ; **Échap** annule la pose. Glisse le terrain pour déplacer la caméra, utilise la molette ou le pincement pour zoomer.
- Le petit socle indique la place occupée. Le grand cercle indique la portée : il peut traverser une route même si la défense elle-même doit rester à côté.
- La mise à jour réduit les socles de 25 % et la marge entre défenses à 10 cm. Les chemins restent élargis de 20 %. Cette version agrandit encore les cartes de 25 % par côté : elles mesurent désormais 75 à 87 mètres de côté.

### Sur téléphone

- Joue en **portrait ou paysage** : tourne simplement le téléphone, le HUD se réorganise sans quitter la partie. Une pose en cours est annulée lors du changement de disposition pour éviter une construction involontaire.
- Les **six cartes** restent accessibles en bas. Touche une défense, puis le terrain ; la croix de sa fiche annule la pose.
- Glisse le terrain pour déplacer la vue, pince pour zoomer ou utilise **+ / −**.
- Le bouton **Carte** agrandit la minicarte : touche un endroit pour le rejoindre. **Château** recentre la caméra.
- **Plein écran** s’affiche si le navigateur le permet. Le jeu reste utilisable sans cette option.
- Les fiches de défense et de territoire défilent quand l’écran est bas.

## 4. Si ça bloque

| Problème | À vérifier |
|---|---|
| « node n’est pas reconnu » | Installe Node.js LTS, puis ferme et relance le fichier `.bat`. |
| Le téléphone n’ouvre pas le jeu | Même Wi-Fi, adresse réseau exacte, serveur ouvert. Un réseau invité peut isoler les appareils. |
| Le code est introuvable | Même adresse de serveur pour tous ; vérifie le code. Le salon disparaît si le serveur redémarre ou si l’hôte le quitte. |
| « Salon complet » | Le duel accepte 2 joueurs ; les autres salons, jusqu’à 4. |
| La partie ne démarre pas | Chaque joueur doit être connecté et prêt. Duel : 2 ; 2v2/FFA : 4 ; coop : au moins 2. |
| « Ce site ne possède pas le serveur » | Tu es sur le HTML seul ou un hébergement statique. Utilise l’adresse du serveur local ou Node.js hébergé. |
| Le jeu se coupe quand l’hôte part | L’hôte doit garder son onglet ouvert ; en local, garde aussi la fenêtre du serveur. |
| Un service gratuit met longtemps à s’ouvrir | Attends son redémarrage avant de créer ou rejoindre le salon. |

## Documentation officielle

Consultée pour ce tutoriel :

- [Installer Node.js](https://nodejs.org/fr/download) — choisir LTS.
- [Render : déployer un service web](https://render.com/docs/web-services).
- [Render : limites du plan gratuit](https://render.com/docs/free).

Les parties ont été testées localement ; la mise en ligne Render est décrite mais n’a pas été exécutée pour ton compte.
