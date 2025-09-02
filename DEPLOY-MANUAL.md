# 🚀 GUIDE DE DÉPLOIEMENT MANUEL - BIRTHDAY BATTLE ROYALE

## ÉTAPE 1: Installation de Vercel CLI

```bash
npm install -g vercel
```

## ÉTAPE 2: Connexion à Vercel

```bash
vercel login
```

## ÉTAPE 3: Déploiement du Frontend

1. **Build du projet**:
```bash
npm run build
```

2. **Déploiement**:
```bash
vercel --prod
```

3. **Configuration des variables d'environnement**:
- Aller sur Vercel Dashboard
- Sélectionner le projet frontend
- Settings > Environment Variables
- Ajouter: `REACT_APP_API_URL` = URL du backend Vercel

## ÉTAPE 4: Déploiement du Backend

1. **Aller dans le dossier backend**:
```bash
cd backend
```

2. **Déployer**:
```bash
vercel --prod
```

3. **Configuration**:
- Sur Vercel Dashboard > Projet Backend
- Settings > Environment Variables
- Ajouter toutes les variables requises:
  - `ADMIN_TOKEN` = "Agathe0211/"
  - `NODE_ENV` = "production"
  - (Optionnel) Variables Firebase et Email

## ÉTAPE 5: Configuration finale

1. **Mettre à jour l'URL API du Frontend**:
   - Dashboard Vercel > Projet Frontend
   - Environment Variables
   - `REACT_APP_API_URL` = URL du backend déployé

2. **Redéployer le frontend** pour prendre en compte la nouvelle URL API:
```bash
vercel --prod
```

## URLs finales

- **Frontend**: https://birthday-battle-royale.vercel.app
- **Backend**: https://birthday-battle-backend.vercel.app

## Variables d'environnement requises

### Frontend
- `REACT_APP_API_URL`: URL du backend Vercel

### Backend
- `ADMIN_TOKEN`: "Agathe0211/"
- `NODE_ENV`: "production"
- (Optionnel) Firebase et Email configs

## Test final

1. Ouvrir l'URL du frontend
2. Tester l'inscription
3. Tester les fonctionnalités admin
4. Vérifier les jeux et leaderboard

🎉 **DÉPLOIEMENT TERMINÉ !**
