# 🚀 Guide de Déploiement Vercel - Birthday Battle Royale

## 📋 Prérequis

1. Compte Vercel: https://vercel.com
2. GitHub repository avec votre code
3. Vercel CLI (optionnel): `npm i -g vercel`

## 🔧 Étapes de Déploiement

### Option 1: Déploiement via Vercel Dashboard (Recommandé)

#### 1. **Frontend (Interface Utilisateur)**
1. Connectez-vous à Vercel Dashboard
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez le projet :
   - **Framework Preset**: Create React App
   - **Root Directory**: `.` (racine)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Variables d'environnement** (dans Vercel Dashboard):
   ```
   REACT_APP_API_URL=https://votre-api.vercel.app/api
   REACT_APP_ENVIRONMENT=production
   ```

6. Cliquez sur "Deploy"

#### 2. **Backend (API)**
1. Créez un nouveau projet Vercel pour l'API
2. Importez le même repository
3. Configurez le projet :
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: `backend`

4. **Variables d'environnement** (dans Vercel Dashboard):
   ```
   NODE_ENV=production
   ADMIN_TOKEN=Agathe0211/
   VERCEL=1
   
   # Firebase (optionnel - pour vraie base de données)
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   
   # Email (optionnel)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. Cliquez sur "Deploy"

#### 3. **Mise à jour de l'URL API**
1. Une fois l'API déployée, copiez son URL (ex: `https://birthday-battle-api.vercel.app`)
2. Retournez au projet Frontend
3. Mettez à jour la variable `REACT_APP_API_URL` avec l'URL de votre API
4. Redéployez le frontend

### Option 2: Déploiement via CLI

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer le Frontend (depuis la racine)
cd /votre/projet
vercel --prod

# 4. Déployer le Backend (depuis backend/)
cd backend
vercel --prod

# 5. Lier les URLs
vercel env add REACT_APP_API_URL production
# Entrer l'URL de votre API backend
```

## 🔧 Configuration Post-Déploiement

### 1. **Test des URLs**
- Frontend: `https://votre-frontend.vercel.app`
- API: `https://votre-api.vercel.app/api/health`

### 2. **Vérification des fonctionnalités**
- ✅ Inscription utilisateur
- ✅ Pages Games et Leaderboard
- ✅ Panneau Admin (avec token: `Agathe0211/`)
- ✅ Création de jeux par l'admin

### 3. **Mode Mock vs Firebase**
- **Mode Mock**: Fonctionne immédiatement (données en mémoire)
- **Mode Firebase**: Nécessite configuration Firebase dans Vercel

## 🎯 URLs Finales

Une fois déployé, vous aurez :
- **App principale**: `https://birthday-battle-frontend.vercel.app`
- **API Backend**: `https://birthday-battle-api.vercel.app`
- **Admin Panel**: `https://birthday-battle-frontend.vercel.app/admin`

## 🔒 Sécurité

- Token admin: `Agathe0211/` (changez-le dans les variables Vercel)
- CORS configuré pour accepter toutes les origines
- Mode HTTPS automatique sur Vercel

## 📱 Test Mobile

L'app sera automatiquement accessible depuis mobile via l'URL Vercel !

## 🔄 Mise à jour

Pour mettre à jour après déploiement :
1. Push vos changements sur GitHub
2. Vercel redéploie automatiquement
3. Ou utilisez `vercel --prod` pour redéploiement manuel

## 🆘 Dépannage

- **API non accessible**: Vérifiez l'URL dans `REACT_APP_API_URL`
- **CORS Errors**: L'API est configurée pour accepter toutes les origines
- **Token Admin**: Assurez-vous que `ADMIN_TOKEN` est bien configuré
- **Mode Mock**: L'app fonctionne sans Firebase (données temporaires)

Votre Birthday Battle Royale sera prêt pour la production ! 🎉
