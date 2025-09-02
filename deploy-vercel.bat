@echo off
echo.
echo 🎮 Birthday Battle Royale - Deploiement Vercel
echo.
echo ✅ Repository GitHub cree avec succes !
echo 📂 https://github.com/enzoPerreve/birthday-battle-royale
echo.
echo 🚀 PROCHAINES ETAPES :
echo.
echo 1. Allez sur https://vercel.com/dashboard
echo 2. New Project -^> Import birthday-battle-royale
echo 3. Deployer le FRONTEND (configuration automatique)
echo 4. Creer un NOUVEAU projet pour le BACKEND
echo 5. Root Directory: backend, Framework: Other
echo.
set /p openDashboard="Ouvrir Vercel Dashboard ? (y/n): "
if /i "%openDashboard%"=="y" (
    echo Ouverture du dashboard...
    start https://vercel.com/dashboard
)
echo.
echo 📖 Guide detaille dans VERCEL-STEPS.md
echo.
pause
