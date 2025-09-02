@echo off
echo.
echo 🔧 CONFIGURATION MANUELLE DES VARIABLES D'ENVIRONNEMENT
echo =======================================================
echo.

echo 📱 ÉTAPE 1: Configuration Frontend
echo Ouverture de la page de configuration frontend...
start https://vercel.com/enzoperreves-projects/birthday-battle-royale/settings/environment-variables
echo.
echo Variable à ajouter:
echo   Name: REACT_APP_API_URL
echo   Value: https://birthday-battle-pvz3kmjq5-enzoperreves-projects.vercel.app
echo   Environment: Production
echo.
pause

echo.
echo 🔧 ÉTAPE 2: Configuration Backend  
echo Ouverture de la page de configuration backend...
start https://vercel.com/enzoperreves-projects/birthday-battle-api/settings/environment-variables
echo.
echo Variables à ajouter:
echo   1. Name: ADMIN_TOKEN
echo      Value: Agathe0211/
echo      Environment: Production
echo.
echo   2. Name: NODE_ENV
echo      Value: production  
echo      Environment: Production
echo.
pause

echo.
echo 🎯 ÉTAPE 3: Test de l'application
echo Ouverture de l'application déployée...
start https://birthday-battle-royale-94sfk3pjp-enzoperreves-projects.vercel.app
echo.
echo ✅ Configuration terminée!
echo L'application devrait maintenant fonctionner correctement.
echo.
pause
