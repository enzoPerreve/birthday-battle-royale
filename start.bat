@echo off
echo 🎮 Birthday Battle Royale - Starting Development Environment 🎮
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d backend && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Application...
start "Frontend" cmd /k "npm start"

echo.
echo 🌐 Application URLs:
echo Backend API: http://localhost:3000
echo Frontend App: http://localhost:3001
echo.
echo 🔧 Admin Access:
echo Token: admin123
echo.
echo 📖 Quick Start:
echo 1. Visit http://localhost:3001 to see the home page
echo 2. Go to /register to create a test participant
echo 3. Check /participants to see registered users
echo 4. Use /admin with token "admin123" to manage battles
echo.
echo Press any key to continue...
pause > nul
