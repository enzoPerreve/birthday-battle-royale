# Birthday Battle Royale - Development Starter
Write-Host "🎮 Birthday Battle Royale - Starting Development Environment 🎮" -ForegroundColor Yellow
Write-Host ""

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

Write-Host "Waiting for backend to start..." -ForegroundColor Blue
Start-Sleep -Seconds 3

Write-Host "Starting Frontend Application..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm start"

Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "Frontend App: http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Admin Access:" -ForegroundColor Magenta
Write-Host "Token: admin123" -ForegroundColor White
Write-Host ""
Write-Host "📖 Quick Start:" -ForegroundColor Yellow
Write-Host "1. Visit http://localhost:3001 to see the home page" -ForegroundColor White
Write-Host "2. Go to /register to create a test participant" -ForegroundColor White
Write-Host "3. Check /participants to see registered users" -ForegroundColor White
Write-Host "4. Use /admin with token 'admin123' to manage battles" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
