@echo off
REM 🧪 Script de test pour Birthday Battle Royale - Enhanced Gaming Edition (Windows)
REM Ce script lance l'application complète et vérifie son bon fonctionnement

setlocal EnableDelayedExpansion

echo.
echo 🧪 Test de lancement - Birthday Battle Royale Gaming Edition
echo ==========================================================
echo.

REM Vérifier les prérequis
echo 🔍 Vérification des prérequis...

where node >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo ❌ npm n'est pas installé
    pause
    exit /b 1
)

echo ✅ Node.js installé
echo ✅ npm installé

REM Vérifier la structure du projet
echo.
echo 📁 Vérification de la structure du projet...

if not exist "package.json" (
    echo ❌ package.json introuvable
    pause
    exit /b 1
)

if not exist "backend" (
    echo ❌ Dossier backend introuvable
    pause
    exit /b 1
)

if not exist "backend\app.js" (
    echo ❌ backend\app.js introuvable
    pause
    exit /b 1
)

if not exist "src\App.js" (
    echo ❌ src\App.js introuvable
    pause
    exit /b 1
)

echo ✅ Structure du projet validée

REM Installer les dépendances si nécessaire
echo.
echo 📦 Vérification des dépendances...

if not exist "node_modules" (
    echo ⏳ Installation des dépendances frontend...
    call npm install
    echo ✅ Dépendances frontend installées
)

if not exist "backend\node_modules" (
    echo ⏳ Installation des dépendances backend...
    cd backend
    call npm install
    cd ..
    echo ✅ Dépendances backend installées
)

REM Créer des fichiers batch temporaires pour lancer les serveurs
echo.
echo 🚀 Préparation du lancement...

echo @echo off > start_backend.bat
echo cd backend >> start_backend.bat
echo echo 📡 Démarrage du backend sur http://localhost:3000 >> start_backend.bat
echo node app.js >> start_backend.bat
echo pause >> start_backend.bat

echo @echo off > start_frontend.bat
echo echo 🎨 Démarrage du frontend sur http://localhost:3001 >> start_frontend.bat
echo set PORT=3001 >> start_frontend.bat
echo npm start >> start_frontend.bat

echo @echo off > seed_questions.bat
echo cd backend >> seed_questions.bat
echo echo 📝 Ajout des questions de test... >> seed_questions.bat
echo node scripts/seedQuestions.js >> seed_questions.bat
echo pause >> seed_questions.bat

echo.
echo 🎉 PRÊT POUR LE LANCEMENT !
echo ==========================
echo.
echo 📋 Ce qui va être lancé :
echo    🖥️  Backend sur http://localhost:3000
echo    🎨 Frontend sur http://localhost:3001
echo.
echo 📱 Pages disponibles :
echo    🏠 Accueil: http://localhost:3001/
echo    📝 Inscription: http://localhost:3001/register
echo    👥 Participants: http://localhost:3001/participants
echo    🎮 Jeux: http://localhost:3001/games
echo    🏆 Classement: http://localhost:3001/leaderboard
echo    📜 Règles: http://localhost:3001/rules
echo    ⚙️  Admin: http://localhost:3001/admin
echo.
echo 🎯 Tests à effectuer :
echo    1. ✅ Inscription d'un utilisateur avec photo
echo    2. ✅ Affichage des préférences alcool/épicé (BUG CORRIGÉ)
echo    3. ✅ Navigation mobile responsive
echo    4. ✅ Fonctionnement du leaderboard
echo    5. ✅ Interface des jeux
echo    6. ✅ Nouvelles règles
echo.
echo 📱 IMPORTANT: Testez sur mobile !
echo    - Ouvrez http://localhost:3001 sur votre téléphone
echo    - Vérifiez la navigation tactile
echo    - Testez l'inscription avec photo
echo.

set /p launch="Lancer l'application ? (Y/n): "
if /i "%launch%"=="n" (
    echo Test annulé.
    goto cleanup
)

echo.
echo 🚀 Lancement des serveurs...
echo.

REM Lancer le backend dans une nouvelle fenêtre
start "Backend Server" cmd /k start_backend.bat

REM Attendre un peu que le backend démarre
echo ⏳ Attente du démarrage du backend...
timeout /t 5 /nobreak >nul

REM Lancer le frontend dans une nouvelle fenêtre  
start "Frontend Server" cmd /k start_frontend.bat

REM Attendre un peu que le frontend démarre
echo ⏳ Attente du démarrage du frontend...
timeout /t 8 /nobreak >nul

REM Lancer le peuplement de la base de données
echo.
echo 📝 Ajout des questions de test...
start "Seed Questions" cmd /c seed_questions.bat

echo.
echo 🎉 APPLICATION LANCÉE !
echo ======================
echo.
echo 📊 Statut:
echo    🖥️  Backend: http://localhost:3000 (fenêtre séparée)
echo    🎨 Frontend: http://localhost:3001 (fenêtre séparée)
echo.
echo 🌐 Pour tester l'application:
echo    1. Attendez que les deux serveurs soient prêts (quelques secondes)
echo    2. Ouvrez http://localhost:3001 dans votre navigateur
echo    3. Testez toutes les nouvelles fonctionnalités !
echo.

set /p open="Ouvrir l'application dans le navigateur ? (Y/n): "
if /i not "%open%"=="n" (
    start http://localhost:3001
)

echo.
echo 🎮 ENHANCED GAMING EDITION LANCÉE !
echo ===================================
echo.
echo ✨ Nouvelles fonctionnalités disponibles:
echo    🎯 Système de jeux avec quiz personnalisé
echo    🏆 Classement par points en temps réel
echo    📱 Interface 100%% mobile-responsive
echo    🐛 Bug préférences alcool/épicé corrigé
echo.
echo 🛠️  Pour arrêter les serveurs:
echo    - Fermez les fenêtres des serveurs
echo    - Ou utilisez Ctrl+C dans chaque fenêtre
echo.

:cleanup
REM Nettoyer les fichiers temporaires
if exist start_backend.bat del start_backend.bat
if exist start_frontend.bat del start_frontend.bat
if exist seed_questions.bat del seed_questions.bat

echo.
echo 🎊 Test terminé ! Amusez-vous bien avec votre application !
echo.
pause
