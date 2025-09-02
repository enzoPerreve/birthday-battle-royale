@echo off
echo.
echo 🚀 BIRTHDAY BATTLE ROYALE - DEPLOIEMENT AUTOMATIQUE
echo =====================================================
echo.

echo 📦 Installation de Vercel CLI...
call npm install -g vercel

echo.
echo ✅ Vercel CLI installé!
echo.
echo 🔐 Connexion à Vercel...
call vercel login

echo.
echo 🎯 Déploiement du FRONTEND...
call npm run build
call vercel --prod --yes

echo.
echo 🔧 Déploiement du BACKEND...
cd backend
call vercel --prod --yes
cd..

echo.
echo 🎉 DÉPLOIEMENT TERMINÉ!
echo.
echo 📝 Prochaines étapes:
echo    1. Configurer les variables d'environnement sur Vercel
echo    2. Connecter le frontend au backend
echo    3. Tester l'application
echo.
pause
