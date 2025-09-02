# 🚀 Script de Déploiement Vercel Simple

Write-Host "🎮 Birthday Battle Royale - Deploiement Vercel" -ForegroundColor Green
Write-Host ""

Write-Host "✅ Repository GitHub cree avec succes !" -ForegroundColor Green
Write-Host "📂 https://github.com/enzoPerreve/birthday-battle-royale" -ForegroundColor Yellow
Write-Host ""

Write-Host "🚀 PROCHAINES ETAPES :" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Allez sur https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. New Project -> Import birthday-battle-royale" -ForegroundColor White
Write-Host "3. Deployer le FRONTEND (configuration automatique)" -ForegroundColor White
Write-Host "4. Creer un NOUVEAU projet pour le BACKEND" -ForegroundColor White
Write-Host "5. Root Directory: backend, Framework: Other" -ForegroundColor White
Write-Host ""

$openDashboard = Read-Host "Ouvrir Vercel Dashboard ? (y/n)"

if ($openDashboard -eq "y" -or $openDashboard -eq "Y" -or $openDashboard -eq "") {
    Write-Host "Ouverture du dashboard..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/dashboard"
}

Write-Host ""
Write-Host "📖 Guide detaille dans VERCEL-STEPS.md" -ForegroundColor Blue
Write-Host ""
Read-Host "Appuyez sur Entree pour continuer..."
