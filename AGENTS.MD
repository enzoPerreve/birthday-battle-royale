✅ ENHANCED VERSION 2.0 - Birthday Battle Royale Gaming Edition

Ce fichier servira de brief technique complet pour la version améliorée avec système de jeux intégré, classement par points, et interface mobile-responsive.

🎮 NOUVELLES FONCTIONNALITÉS AJOUTÉES :
- Système de jeux (Quiz, Musique, Paroles) avec points
- Classement en temps réel (Leaderboard)
- Interface 100% mobile-responsive
- Base de données étendue avec questions/jeux
- Correction bugs preferences alcool/épicé

# 🎮 Projet : Birthday Battle Royale - ENHANCED GAMING EDITION

## 🎯 Objectif
Créer une plateforme interactive complète pour soirée d'anniversaire avec système de jeux intégré, classement par points, et interface mobile-responsive pour une expérience gaming immersive.

## 📅 Status
Test complet prévu le 24/09 ✅ COMPLETED
Version Enhanced Gaming Edition ✅ ACTIVE

## 🎮 NOUVELLES FONCTIONNALITÉS - VERSION 2.0

### Système de Jeux Intégré
- **Quiz Personnalisé** : Questions sur la personne d'anniversaire (4 réponses possibles)
- **Devine les Paroles** : Jeu musical interactif  
- **Devine la Musique** : Reconnaissance audio
- **Système de Points** : 10-30 points selon difficulté (facile/moyen/difficile)
- **Classement en Temps Réel** : Leaderboard dynamique avec podium

### Interface Mobile-First
- Design 100% responsive pour utilisation sur téléphones
- Navigation optimisée tactile
- Boutons et interactions adaptés aux écrans mobiles
- Animations touch-friendly (hover désactivé, touch feedback)

## 📱 NOUVELLES PAGES DÉVELOPPÉES

### 6. Games (/games) ⭐ NEW
- **Liste des jeux actifs** avec statuts temps réel (attente/actif/terminé)
- **Cartes de jeux** avec informations détaillées (participants, temps limite)
- **Système de participation** : rejoindre/quitter les jeux automatiquement
- **Interface adaptative** selon le statut et participation utilisateur
- **Statistiques générales** : nombre de jeux actifs, participants totaux
- **Auto-refresh** toutes les 10 secondes

### 7. Leaderboard (/leaderboard) ⭐ NEW
- **Classement par points** avec podium visuel (🥇🥈🥉)
- **Statistiques détaillées** : points totaux, victoires, jeux joués
- **Cartes ranking** avec couleurs spéciales pour top 3
- **Mise à jour automatique** toutes les 10 secondes
- **Interface mobile** : cartes empilées verticalement

### 8. Rules (mise à jour majeure) ⭐ ENHANCED
- **Nouvelles règles de jeux** : quiz personnalisé, devine les paroles, devine la musique
- **Système de points expliqué** : 10 points (facile), 20 points (moyen), 30 points (difficile)
- **Instructions mobiles** : comment utiliser sur téléphone
- **Guide complet** pour toutes les activités gaming

## 🔧 ARCHITECTURE TECHNIQUE AMÉLIORÉE

### Backend Enhanced
```
backend/
├── models/
│   ├── User.js (enhanced avec points, gamesPlayed, wins + méthodes addPoints/getLeaderboard)
│   ├── Question.js (nouveau - CRUD questions avec getRandomQuestions)
│   └── Game.js (nouveau - gestion complète jeux avec participants/scores)
├── controllers/
│   ├── gameController.js (nouveau - API complète jeux + leaderboard)
│   └── userController.js (bug fix parsing JSON preferences)
├── routes/
│   └── gameRoutes.js (nouveau - /games, /games/:id/join, /leaderboard)
└── scripts/
    └── seedQuestions.js (20 questions exemple prêtes à utiliser)
```

### Frontend Enhanced  
```
src/
├── pages/
│   ├── Games.js (nouveau - interface jeux avec participation)
│   ├── Leaderboard.js (nouveau - classement avec podium)
│   └── Rules.js (complètement réécrit pour système gaming)
├── services/
│   └── gameService.js (nouveau - API service pour jeux)
├── components/
│   └── Navigation.js (ajout liens Games + Leaderboard)
└── styles/
    └── App.css (styles mobiles + jeux + leaderboard)
```

### Base de Données Étendue
- **Collection users** : +points (number), +gamesPlayed (number), +wins (number)
- **Collection games** : titre, type, description, participants[], maxParticipants, timeLimit, status, scores{}
- **Collection questions** : question, options[4], correctAnswer, category, difficulty, points

## 🐛 BUGS CORRIGÉS
- **Préférences alcool/épicé** : Fix parsing JSON.stringify depuis FormData dans userController
- **Rules.js corruption** : Recréation complète du fichier après erreur remplacement
- **Mobile responsiveness** : Tous les composants adaptés écrans téléphones

## 🎨 Identité visuelle (maintenue + ajouts)

- Style : Arcade 2D rétro + éléments festifs
- Couleurs originales maintenues :
  - Fond : #0A1A2F (bleu nuit)  
  - Texte : #F2F2F2 (blanc cassé)
  - Rouge : #FF2D2D
  - Jaune : #FFD700
  - Boutons : #D62828
- **Nouveaux ajouts** :
  - Vert actif : #00FF00 (jeux en cours)
  - Orange accent : #FF6B6B (boutons accent)
  - Argent : #C0C0C0 (2ème place)
  - Bronze : #CD7F32 (3ème place)

# 🎮 Projet : Birthday Battle Royale

## 🎯 Objectif
Créer un site web interactif pour une soirée d’anniversaire sur le thème des battles aléatoires (1v1, 3v3, etc.), avec une ambiance arcade rétro et festive.

## 📅 Deadline
Test complet prévu le 24/09
🖼️ Design & UI
markdown
## 🎨 Identité visuelle

- Style : Arcade 2D rétro + éléments festifs (ballons, éclairs, typographie pixel)
- Couleurs :
  - Fond : #0A1A2F (bleu nuit)
  - Texte pixel : #F2F2F2 (blanc cassé)
  - Accent rouge : #FF2D2D
  - Jaune pixel : #FFD700
  - Boutons : #D62828
- Typographie :
  - Titres & boutons : Pixel Emulator / Press Start 2P
  - Texte courant : Montserrat / Roboto

## 📄 Pages à développer

### 1. Home
- Titre : "Birthday Battle Royale"
- Ballons pixelisés
- Bouton : "Voir les règles"

### 2. Register
- Formulaire :
  - Nom / pseudo
  - Photo (upload)
  - Préférences : alcool / piment
  - Contact : email ou téléphone
- Bouton : "Create Profile"
- Logo VS. en bas

### 3. Participants
- Galerie avec :
  - Photo
  - Nom
  - Phrase personnalisée
  - Icônes préférences (bouteille / piment)

### 4. Rules
- Liste :
  - Battles toutes les 20 min
  - Types : 1v1, 3v3, etc.
  - Sélection aléatoire
- Logo VS. en bas

### 5. Admin (privé)
- Dashboard :
  - Liste des invités
  - Visualisation des duels
  - Contrôle des animations projetées
🧩 Fonctionnalités techniques
markdown
## 🔧 Fonctionnalités

- Génération de profils via lien QR (QR sur carton d’invitation uniquement)
- Base de données (Firebase / Supabase)
- Système de notifications (Twilio / Mailjet)
- Animations web (GSAP / CSS keyframes)
- Responsive mobile + écran projeté

## 📦 Composants à intégrer

- Formulaire d’inscription
- Galerie des participants
- Système de sélection aléatoire
- Animation visuelle des duels
- Interface admin en temps réel

## 🏠 FRAME 1 : Page d’accueil — *Home*

### 📐 Dimensions

- Format : 1440 x 1024 px (desktop)
- Marges internes : 80 px

### 🎨 Éléments

- **Fond** : Bleu nuit `#0A1A2F`
- **Ballons** : 3 ballons pixelisés (rouge, bleu, jaune) en haut à gauche et droite
- **Titre principal** :
    - Texte : `BIRTHDAY BATTLE ROYALE`
    - Police : *Press Start 2P* ou équivalent pixel
    - Couleur : Jaune `#FFD700` avec contour rouge `#FF2D2D`
    - Alignement : centré
- **Texte secondaire** :
    - `SCAN QR CODE TO REGISTER`
    - Couleur : Jaune `#FFD700`
    - Police : même que le titre, taille réduite
- **Bouton** :
    - Texte : `VIEW RULES`
    - Fond : Rouge `#D62828`
    - Texte : Blanc cassé `#F2F2F2`
    - Bordure pixelisée
    - Hover : éclair rouge en fond

## 📝 FRAME 2 : Page d’inscription — *Register*

### 📐 Dimensions

- Format : 1440 x 1024 px

### 🎨 Éléments

- **Titre** : `REGISTER`
    - Police : pixel art
    - Couleur : Blanc cassé `#F2F2F2` avec contour rouge
- **Ballons** : 3 ballons pixelisés en haut
- **Formulaire** (encadré pixelisé blanc) :
    - **Champ 1** : `Name` → input text
    - **Champ 2** : `Profile Photo` → bouton `Choose File` + texte `No file chosen`
    - **Champ 3** : `Preferences` → checkbox `Alcohol`, checkbox `Spicy Food`
    - **Champ 4** : `Contact Information` → input text
- **Bouton** :
    - Texte : `CREATE PROFILE`
    - Fond : Rouge `#D62828`
    - Texte : Blanc cassé
    - Style pixelisé
- **Logo VS.** :
    - Texte : `VS.`
    - Couleur : Rouge feu `#FF2D2D` + contour jaune
    - Effet : éclairs pixelisés de chaque côté

## 👥 FRAME 3 : Page des participants — *Participants*

### 📐 Dimensions

- Format : 1440 x 1024 px

### 🎨 Éléments

- **Titre** : `PARTICIPANTS`
    - Police : pixel
    - Couleur : Blanc cassé avec contour rouge
- **Ballons** : 2 ballons pixelisés
- **Grille** : 2x2 portraits
    - **Cadre** : rectangle pixelisé jaune
    - **Image** : avatar pixelisé
    - **Nom** : texte jaune pixelisé
    - **Phrase** : `Ready to rumble!` en blanc cassé
    - **Icônes préférences** :
        - Bouteille jaune pour alcool
        - Piment rouge pour spicy

## 📜 FRAME 4 : Page des règles — *Rules*

### 📐 Dimensions

- Format : 1440 x 1024 px

### 🎨 Éléments

- **Titre** : `RULES`
    - Police : pixel
    - Couleur : Blanc cassé avec contour rouge
- **Ballons** : 2 ballons pixelisés
- **Liste à puces** :
    - `Battles take place every 20 minutes.`
    - `Types of battles include 1v1, 3v3, etc.`
    - `Participants are selected randomly.`
    - Police : pixel, couleur blanc cassé
- **Logo VS.** :
    - Identique à la page Register
    - Positionné en bas

    ### 🖍️ Couleurs principales (style arcade rétro + fête)

| Élément | Couleur | Code Hex |
| --- | --- | --- |
| Fond principal | Bleu nuit pixelisé | `#0A1A2F` |
| Texte pixel | Blanc cassé | `#F2F2F2` |
| Accent 1 | Rouge éclair | `#FF2D2D` |
| Accent 2 | Jaune pixel | `#FFD700` |
| Boutons | Rouge vif | `#D62828` |
| Ballons | Rouge, bleu, jaune | `#FF3B3B`, `#3B9CFF`, `#FFD700` |

## 🖼️ Éléments graphiques

- Ballons pixelisés (rouge, bleu, jaune)
- Éclairs rouges en fond ou en séparateur
- Typo pixel art pour tous les titres et boutons
- Logo “VS.” en rouge et jaune avec effet feu
- Bordures en style pixel (cadres, boutons, formulaires)

## 🔤 Typographie

- **Titres & boutons** : Police pixel style arcade (ex : *Press Start 2P*, *Pixel Emulator*)
- **Texte courant** : Police sans-serif simple (ex : *Montserrat*, *Roboto*)

## 

## 🧩 Composants techniques à prévoir

- Base de données (Firebase, Supabase, etc.)
- Système de notifications (Twilio, Mailjet)
- Animations web (GSAP, CSS keyframes)
- Interface responsive (mobile + projection écran)
- Génération de profils à partir du lien QR

### 1. **Page d’accueil**

- Titre : *Birthday Battle Royale*
- Ballons en haut
- Texte : *Scan QR code to register* (le QR sera sur le carton)
- Bouton : *Voir les règles* / *Voir les participants*

### 2. **Page d’inscription**

- Formulaire :
    - Nom / pseudo
    - Photo (upload)
    - Préférences : alcool / piment
    - Contact : email ou téléphone
- Bouton : *Create Profile*
- Logo “VS.” en bas

### 3. **Page des participants**

- Galerie avec :
    - Photo
    - Nom
    - Phrase personnalisée
    - Icônes préférences (bouteille / piment)
    - Option de like ou commentaire (facultatif)

### 4. **Page des règles**

- Titre : *RULES*
- Liste :
    - Battles toutes les 20 min
    - Types : 1v1, 3v3, etc.
    - Sélection aléatoire
- Logo “VS.” en bas

### 5. **Page admin (non publique)**

- Dashboard :
    - Liste des invités
    - Visualisation des duels en temps réel
    - Contrôle des animations projetées

    $color-bg: #0A1A2F;
$color-text: #F2F2F2;
$color-red: #FF2D2D;
$color-yellow: #FFD700;
$color-button: #D62828;

$font-title: 'Press Start 2P', cursive;
$font-body: 'Montserrat', sans-serif;
