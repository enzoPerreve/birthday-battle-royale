# 🚀 Script de déploiement PowerShell pour Birthday Battle Royale

Write-Host "🎮 Déploiement Birthday Battle Royale sur Vercel..." -ForegroundColor Green

# Vérification que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: Exécutez ce script depuis la racine du projet" -ForegroundColor Red
    exit 1
}

# Installation des dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

# Build du frontend
Write-Host "🔨 Build du frontend..." -ForegroundColor Yellow
npm run build

# Installation des dépendances backend
Write-Host "📦 Installation des dépendances backend..." -ForegroundColor Yellow
Set-Location backend
npm install
Set-Location ..

# Vérification de Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if ($vercelInstalled) {
    Write-Host "🚀 Déploiement avec Vercel CLI..." -ForegroundColor Green
    
    # Déploiement du frontend
    Write-Host "📱 Déploiement Frontend..." -ForegroundColor Yellow
    vercel --prod
    
    # Déploiement du backend
    Write-Host "🖥️ Déploiement Backend..." -ForegroundColor Yellow
    Set-Location backend
    vercel --prod
    Set-Location ..
    
    Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
    Write-Host "🌐 Vérifiez vos URLs sur https://vercel.com/dashboard" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ Vercel CLI non installé." -ForegroundColor Yellow
    Write-Host "📝 Suivez les instructions dans DEPLOYMENT.md pour déployer manuellement" -ForegroundColor Cyan
    Write-Host "💡 Ou installez Vercel CLI: npm i -g vercel" -ForegroundColor Cyan
}

Write-Host "🎉 Script terminé!" -ForegroundColor Green

# Pause pour lire le résultat
Read-Host "Appuyez sur Entrée pour continuer..."
