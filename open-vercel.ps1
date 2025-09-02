# 🚀 Script d'Ouverture Automatique pour Vercel

Write-Host "🎮 Ouverture automatique des pages Vercel..." -ForegroundColor Green
Write-Host ""

# URLs à ouvrir
$urls = @(
    "https://vercel.com/dashboard",
    "https://github.com/enzoPerreve/birthday-battle-royale"
)

Write-Host "📂 Repository GitHub :" -ForegroundColor Cyan
Write-Host "https://github.com/enzoPerreve/birthday-battle-royale" -ForegroundColor Yellow
Write-Host ""

Write-Host "🌐 Vercel Dashboard :" -ForegroundColor Cyan
Write-Host "https://vercel.com/dashboard" -ForegroundColor Yellow
Write-Host ""

# Demander si on veut ouvrir les URLs
$openUrls = Read-Host "Voulez-vous ouvrir automatiquement ces pages ? (y/n)"

if ($openUrls -eq "y" -or $openUrls -eq "Y" -or $openUrls -eq "") {
    Write-Host "🔍 Ouverture des pages..." -ForegroundColor Yellow
    
    foreach ($url in $urls) {
        Start-Process $url
        Start-Sleep -Milliseconds 500
    }
    
    Write-Host "✅ Pages ouvertes !" -ForegroundColor Green
} else {
    Write-Host "ℹ️ URLs affichées ci-dessus pour copier-coller" -ForegroundColor Blue
}

Write-Host ""
Write-Host "📋 RÉCAPITULATIF DES ÉTAPES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 🎯 Déployer le FRONTEND :" -ForegroundColor Cyan
Write-Host "   - New Project → birthday-battle-royale → Deploy" -ForegroundColor White
Write-Host "   - Configuration automatique (Create React App)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🖥️ Déployer le BACKEND :" -ForegroundColor Cyan
Write-Host "   - Nouveau Project → même repository" -ForegroundColor White
Write-Host "   - Root Directory: 'backend'" -ForegroundColor Red
Write-Host "   - Framework: 'Other'" -ForegroundColor Red
Write-Host "   - Variables: NODE_ENV=production, ADMIN_TOKEN=Agathe0211/, VERCEL=1" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 🔗 Connecter Frontend ↔ Backend :" -ForegroundColor Cyan
Write-Host "   - Copier URL backend" -ForegroundColor White
Write-Host "   - Frontend Settings → Environment Variables" -ForegroundColor White
Write-Host "   - REACT_APP_API_URL = URL_du_backend" -ForegroundColor Gray
Write-Host ""

Write-Host "📄 Guide détaillé disponible dans: VERCEL-STEPS.md" -ForegroundColor Blue
Write-Host ""

Read-Host "Appuyez sur Entrée quand vous avez terminé le déploiement..."

# Proposer de tester les URLs
Write-Host ""
Write-Host "🧪 TEST DES DÉPLOIEMENTS" -ForegroundColor Yellow
Write-Host ""

$frontendUrl = Read-Host "Collez l'URL de votre FRONTEND Vercel (optionnel)"
$backendUrl = Read-Host "Collez l'URL de votre BACKEND Vercel (optionnel)"

if ($frontendUrl -ne "") {
    Write-Host "🌐 Test Frontend: $frontendUrl" -ForegroundColor Cyan
    Start-Process $frontendUrl
}

if ($backendUrl -ne "") {
    $healthUrl = $backendUrl + "/api/health"
    Write-Host "🖥️ Test Backend: $healthUrl" -ForegroundColor Cyan
    Start-Process $healthUrl
}

Write-Host ""
Write-Host "🎉 DÉPLOIEMENT TERMINÉ !" -ForegroundColor Green
Write-Host "Votre Birthday Battle Royale est maintenant en production !" -ForegroundColor Yellow
