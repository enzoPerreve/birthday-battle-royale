@echo off
echo.
echo 🔧 CONFIGURATION FINALE - BIRTHDAY BATTLE ROYALE
echo ============================================
echo.

echo ⚙️ Configuration des variables d'environnement...
echo.

echo 📱 FRONTEND - Configuration API URL...
call vercel env add REACT_APP_API_URL production "https://birthday-battle-pvz3kmjq5-enzoperreves-projects.vercel.app"

echo.
echo 🔧 BACKEND - Configuration Admin Token...
cd backend
call vercel env add ADMIN_TOKEN production "Agathe0211/"
call vercel env add NODE_ENV production "production"

echo.
echo 🚀 Redéploiement avec nouvelles variables...
cd..
call vercel --prod

echo.
echo 🔧 Redéploiement backend...
cd backend
call vercel --prod

echo.
echo 🎉 CONFIGURATION TERMINÉE!
echo.
echo 🌐 Frontend: https://birthday-battle-royale-94sfk3pjp-enzoperreves-projects.vercel.app
echo 🔧 Backend:  https://birthday-battle-pvz3kmjq5-enzoperreves-projects.vercel.app
echo.
echo ✅ L'application est maintenant prête à utiliser!
echo.
pause
