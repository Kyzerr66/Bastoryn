# OWNED — Jouer à plusieurs

## Démarrer avec des amis

**Utilise le nouveau ZIP multijoueur.** Le fichier HTML seul permet de jouer en solo ou contre l’IA. Déposer uniquement ce HTML sur Netlify ne lance pas le serveur nécessaire aux comptes, aux amis et aux parties entre appareils.

1. Extrais entièrement `OWNED_Frontieres_3D_Multijoueur.zip` sur un PC.
2. Installe Node.js 20 ou plus récent si nécessaire. Sous Windows, double-clique sur **OUVRIR_MULTIJOUER.bat**. Sur macOS/Linux, lance `node server.cjs` dans le dossier extrait.
3. Garde la fenêtre du serveur ouverte. Le jeu fonctionne sur le PC à `http://localhost:8787`.
4. Pour jouer sur le même Wi-Fi, **tous les joueurs ouvrent l’adresse réseau affichée par le serveur**, par exemple `http://192.168.1.25:8787`. Utilise l’adresse réellement affichée chez toi. Un lien contenant `localhost` ne fonctionne pas pour tes amis.
5. Dans **Combat → Amis & salons**, chaque joueur crée son compte, puis se connecte. Coche **Rester connecté sur cet appareil** pour retrouver ta session.
6. Ajoute l’identifiant ou le code ami de ton ami. Il accepte ta demande dans le même panneau.
7. Avant de créer le salon, prépare tes cartes : **Arsenal** pour les défenses et **Troupes · collection** pour les unités.
8. Crée un salon et choisis le mode et la carte. Dans **Inviter des amis**, clique **Inviter** à côté d’un ami. Il reçoit une invitation directement dans le jeu et clique **Rejoindre**. Vous pouvez aussi partager le code à six caractères.
9. Chaque joueur clique **Je suis prêt**, puis l’hôte lance la partie.

Les invitations concernent les salons qui n’ont pas encore commencé. Elles expirent après dix minutes. Pour rejoindre un autre salon, termine ou quitte d’abord ta partie actuelle.

| Mode | Joueurs humains | Châteaux | Organisation |
|---|---:|---:|---|
| Coopération | 2 à 4 | 1 partagé | Chacun possède son énergie et ses tourelles ; les zones sont partagées |
| 1 contre 1 | 2 | 2 | Un château par joueur |
| 2 contre 2 | 4 | 4 | Places 1–2 contre places 3–4, chacun garde son château |
| Chacun pour soi | 4 | 4 | Tous adversaires |

Pour jouer avec des IA identifiées ou en coopération seul, utilise **Escarmouche → Jouer avec les IA**.

## Le siège PvP, étape par étape

1. Équipe **jusqu’à six défenses et six troupes différentes**. Les deux sélections sont indépendantes. Un exemplaire suffit pour utiliser une troupe plusieurs fois ; sa carte n’est pas consommée.
2. Chaque joueur commence avec **100 PV de château**, **300 énergie personnelle** et trois zones disponibles près de sa base. Tu disposes de vingt secondes pour préparer les défenses.
3. Choisis une défense dans le HUD puis un sol autorisé. Les voies de passage, l’eau, les bâtiments, les autres tourelles et les abords des châteaux restent interdits. Les autres zones s’achètent via **Territoires**.
4. Passe à l’onglet **Troupes** du HUD et sélectionne un château adverse dans **Cible**.
5. Pour une troupe **Route**, touche sa carte : elle part de ton château et suit les routes jusqu’à sa cible.
6. Pour une troupe **Hors-piste**, **Aérienne** ou **Amphibie**, touche sa carte puis place son départ entre **2,4 et 12 mètres de ton château**. Les aériennes volent en ligne droite. Les véhicules calculent un trajet praticable court à travers le terrain et les ponts, en évitant les bâtiments et l’eau. Les amphibies peuvent également traverser l’eau. Si aucun trajet n’existe, choisis un autre départ : aucune énergie n’est dépensée.
7. Les troupes tirent sur les troupes adverses à portée. Certaines touchent aussi les aériennes. Les alliées ne se blessent pas. **Les troupes ne ciblent, ne détruisent et ne neutralisent jamais les tourelles en PvP. Les tourelles peuvent tirer sur les troupes.**
8. Une troupe qui atteint le château adverse inflige ses dégâts au château puis disparaît. Le coût, les PV, les dégâts par tir, l’intervalle de tir, la portée et les dégâts au château sont indiqués dans la collection.

Chaque carte a **2,5 secondes de recharge** après un envoi. Tu peux avoir **40 troupes actives** au maximum. Le revenu de base est de **8 énergie par seconde**, auquel s’ajoutent **1,5 par zone achetée** et le revenu de tes forges. L’influence augmente de 1 toutes les vingt secondes. Tu gagnes aussi de l’énergie en éliminant des troupes.

La dernière alliance avec un château debout gagne. Une partie dure au maximum quinze minutes : les PV cumulés des châteaux encore debout départagent alors les alliances. Une égalité reste possible. Les niveaux des défenses sont égalisés en PvP ; les statistiques des troupes sont adaptées au siège, distinctes de celles des ennemis de campagne. Les effets de création automatique d’unités et les attaques spéciales contre les défenses ne s’appliquent pas en PvP.

## Obtenir les troupes

Les **87 modèles du PvE** figurent dans la collection de troupes. Six cartes de départ sont offertes : Fantassin, Éclaireur à moto, Jeep armée, Char léger, Hélicoptère d’attaque et Médecin.

Chaque ouverture de pack ajoute **une troupe bonus**, en plus des défenses prévues par ce pack. Toutes les troupes peuvent être obtenues, avec des raretés et des probabilités différentes. Les cartes restent cachées jusqu’à l’ouverture du sceau puis leur révélation. Les doublons de troupes sont conservés comme exemplaires supplémentaires ; ils n’augmentent pas les statistiques de siège.

Dans **Troupes · collection**, retire une carte équipée pour libérer un emplacement, puis équipe une autre carte obtenue. La sélection est enregistrée sur cet appareil. Prépare-la avant de créer ou rejoindre un salon.

## Changer d’onglet et reprendre une partie

**Le serveur fait avancer les parties multijoueurs.** L’hôte n’a plus besoin de garder l’onglet visible. Tant que le serveur fonctionne, les ennemis et les autres joueurs continuent. Une reconnexion à ton compte permet de reprendre ta place et de recevoir l’état actuel de la partie. Quitter volontairement le salon abandonne cette place.

Le jeu solo suit le temps écoulé quand l’onglet est masqué. Un téléphone ou un navigateur peut toutefois suspendre complètement une page : au retour, le jeu rattrape le temps écoulé. Fermer le fichier HTML ne lance pas un serveur en arrière-plan.

Les salons sans aucun joueur connecté sont nettoyés après dix minutes. L’arrêt ou le redémarrage du serveur termine les parties en cours ; les comptes et amis restent conservés si leurs fichiers sont préservés.

## Comptes et sauvegarde

- Le compte conserve ton identifiant, ton pseudo, tes amis et les invitations sur **ce serveur**. La session mémorisée dure jusqu’à trente jours ; tu peux te déconnecter depuis le panneau des amis après avoir quitté ton salon.
- Les comptes de deux serveurs indépendants sont distincts. Tous les amis doivent utiliser la même adresse.
- La collection, les crédits, la campagne, les équipements et les réglages restent dans le navigateur de chaque appareil. Ils ne sont pas synchronisés entre appareils par cette version.
- Le serveur conserve ses comptes dans `data/accounts.json`, ou dans le dossier indiqué par `DATA_DIR`. Sauvegarde ce dossier lorsque tu mets le jeu à jour. Ne le publie pas dans un dépôt de code.
- Les mots de passe sont enregistrés sous forme de dérivés salés, pas en clair. Ce serveur ne propose pas de récupération par e-mail : conserve tes identifiants.

## Jouer à distance

Pour des amis sur des réseaux différents, héberge **le projet complet** sur un service capable d’exécuter un serveur Node.js durable. Une page statique seule ne suffit pas.

Le point d’entrée est `server.cjs`, la commande de démarrage est `npm start` et le port peut être fourni par la variable `PORT`. Conserve `accounts.cjs`, `simulation.js` et `dist/index.html` à leurs emplacements. Le service doit accepter les connexions HTTP longues utilisées par les notifications et les parties.

Pour conserver les comptes après un redéploiement, utilise un **disque persistant** et définis `DATA_DIR` vers son dossier. Utilise l’adresse HTTPS du service pour les connexions à distance. Partage ensuite cette même adresse à tous tes amis. Aucun hébergement public n’est créé automatiquement avec ces fichiers.

## Confort et commandes

- **⚙ Réglages** : taille du HUD de 80 à 120 %, volume des effets et du jeu, volume de la musique, coupure générale. Ces réglages sont mémorisés sur cet appareil. Le HUD limite son agrandissement si nécessaire pour tenir dans l’écran.
- **Téléphone** : portrait et paysage sont pris en charge ; glisse pour déplacer la caméra, pince pour zoomer. La minicarte et le bouton Château permettent de se recentrer.
- **PC** : clique pour poser, glisse pour déplacer la caméra, utilise la molette pour zoomer. Les touches 1–6 sélectionnent les cartes de l’onglet actif ; Échap annule une pose.
- **PvE** : les trajets de préparation disparaissent au lancement de la vague. Les marqueurs d’entrée restent visibles pour indiquer d’où viennent les ennemis.
- **Neige** : routes brunes, unités plus sombres et luminosité réduite pour distinguer les éléments.

## Si quelque chose ne fonctionne pas

| Symptôme | À vérifier |
|---|---|
| « Serveur indisponible » | Le lanceur est-il ouvert et l’adresse est-elle celle du serveur ? |
| Ton ami ne trouve pas le salon | Même adresse et même réseau pour la méthode Wi-Fi ; ne partage pas `localhost` |
| Le téléphone ne charge pas le jeu | Réseau Wi-Fi invité isolé, pare-feu du PC ou mauvaise adresse réseau |
| Impossible de lancer | Toutes les places nécessaires sont remplies, connectées et marquées prêtes |
| Le bouton Inviter est grisé | Crée un salon qui n’a pas encore démarré |
| Déploiement refusé | Énergie, recharge, limite de troupes, cible ennemie et point de départ autorisé |
| Les comptes disparaissent après un redéploiement | Le dossier `DATA_DIR` doit être sur un stockage persistant |
| Une troupe ne tire pas sur une tourelle | C’est la règle du PvP : seules les troupes adverses sont ciblées |
