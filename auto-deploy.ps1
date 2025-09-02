#!/usr/bin/env pwsh
# Script de déploiement automatique sur Vercel

Write-Host "🚀 DÉPLOIEMENT BIRTHDAY BATTLE ROYALE SUR VERCEL" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Yellow

# Vérifier si Vercel CLI est installé
try {
    $vercelVersion = vercel --version 2>$null
    if (-not $vercelVersion) {
        throw "Vercel CLI not found"
    }
    Write-Host "✅ Vercel CLI détecté: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI n'est pas installé" -ForegroundColor Red
    Write-Host "📦 Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installé" -ForegroundColor Green
}

# Login Vercel si nécessaire
Write-Host "🔐 Vérification de l'authentification Vercel..." -ForegroundColor Yellow
try {
    $whoami = vercel whoami 2>$null
    if (-not $whoami) {
        Write-Host "🔑 Connexion à Vercel requise..." -ForegroundColor Yellow
        vercel login
    } else {
        Write-Host "✅ Connecté à Vercel: $whoami" -ForegroundColor Green
    }
} catch {
    Write-Host "🔑 Connexion à Vercel..." -ForegroundColor Yellow
    vercel login
}

Write-Host "`n🎯 ÉTAPE 1: DÉPLOIEMENT DU FRONTEND" -ForegroundColor Magenta
Write-Host "-" * 40

# Build du frontend
Write-Host "🔨 Build du frontend..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build frontend réussi" -ForegroundColor Green
} else {
    Write-Host "❌ Échec du build frontend" -ForegroundColor Red
    exit 1
}

# Déploiement frontend
Write-Host "🌐 Déploiement du frontend..." -ForegroundColor Yellow
$frontendUrl = vercel --prod --yes 2>&1 | Select-String "https://.*\.vercel\.app" | ForEach-Object { $_.Matches[0].Value }

if ($frontendUrl) {
    Write-Host "✅ Frontend déployé: $frontendUrl" -ForegroundColor Green
    $apiUrl = $frontendUrl -replace "birthday-battle-frontend", "birthday-battle-backend"
    
    # Mise à jour de la variable d'environnement
    Write-Host "🔧 Configuration de l'API URL..." -ForegroundColor Yellow
    vercel env add REACT_APP_API_URL production $apiUrl
    
    Write-Host "`n🎯 ÉTAPE 2: DÉPLOIEMENT DU BACKEND" -ForegroundColor Magenta
    Write-Host "-" * 40
    
    # Déploiement backend avec configuration spéciale
    Write-Host "🔧 Déploiement du backend..." -ForegroundColor Yellow
    vercel --prod --yes --cwd backend
    
    Write-Host "`n🎉 DÉPLOIEMENT TERMINÉ!" -ForegroundColor Green
    Write-Host "=" * 60 -ForegroundColor Yellow
    Write-Host "🌐 Frontend: $frontendUrl" -ForegroundColor Cyan
    Write-Host "🔧 Backend: $apiUrl" -ForegroundColor Cyan
    Write-Host "`n📝 N'oubliez pas de configurer les variables d'environnement:" -ForegroundColor Yellow
    Write-Host "   - ADMIN_TOKEN" -ForegroundColor White
    Write-Host "   - FIREBASE_* (si utilisé)" -ForegroundColor White
    Write-Host "   - EMAIL_* (si utilisé)" -ForegroundColor White
    
} else {
    Write-Host "❌ Échec du déploiement frontend" -ForegroundColor Red
    exit 1
}

Write-Host "`nAppuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
