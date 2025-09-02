# 🚀 Script GitHub Setup pour Birthday Battle Royale

Write-Host "🎮 Configuration GitHub + Vercel Auto-Deploy..." -ForegroundColor Green

# Instructions pour l'utilisateur
Write-Host ""
Write-Host "📋 ÉTAPES À SUIVRE :" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 📂 Créez un nouveau repository sur GitHub :" -ForegroundColor Cyan
Write-Host "   - Allez sur https://github.com" -ForegroundColor White
Write-Host "   - Cliquez 'New repository'" -ForegroundColor White
Write-Host "   - Nom: 'birthday-battle-royale'" -ForegroundColor White
Write-Host "   - NE PAS initialiser avec README" -ForegroundColor Red
Write-Host ""

Write-Host "2. 🔗 Copiez l'URL de votre repository GitHub" -ForegroundColor Cyan
Write-Host "   Format: https://github.com/VOTRE-USERNAME/birthday-battle-royale.git" -ForegroundColor White
Write-Host ""

# Demander l'URL du repository
$repoUrl = Read-Host "Collez l'URL de votre repository GitHub"

if ($repoUrl -eq "") {
    Write-Host "❌ URL du repository requise. Script annulé." -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter..."
    exit 1
}

Write-Host ""
Write-Host "🔄 Configuration Git..." -ForegroundColor Yellow

# Configuration Git
try {
    # Ajouter le remote origin
    git remote remove origin 2>$null
    git remote add origin $repoUrl
    
    # Renommer la branche en main
    git branch -M main
    
    # Pousser vers GitHub
    Write-Host "📤 Push vers GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ Code poussé vers GitHub avec succès !" -ForegroundColor Green
    Write-Host ""
    
    # Instructions Vercel
    Write-Host "🔥 PROCHAINES ÉTAPES - VERCEL :" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. 🌐 Frontend Setup :" -ForegroundColor Cyan
    Write-Host "   - Allez sur https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   - Cliquez 'New Project'" -ForegroundColor White
    Write-Host "   - Sélectionnez votre repository 'birthday-battle-royale'" -ForegroundColor White
    Write-Host "   - Laissez la configuration par défaut" -ForegroundColor White
    Write-Host "   - Deploy !" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "4. 🖥️ Backend Setup :" -ForegroundColor Cyan
    Write-Host "   - Créez un NOUVEAU projet Vercel" -ForegroundColor White
    Write-Host "   - Même repository 'birthday-battle-royale'" -ForegroundColor White
    Write-Host "   - Root Directory: 'backend'" -ForegroundColor White
    Write-Host "   - Framework: Other" -ForegroundColor White
    Write-Host "   - Variables d'environnement :" -ForegroundColor White
    Write-Host "     * NODE_ENV=production" -ForegroundColor Gray
    Write-Host "     * ADMIN_TOKEN=Agathe0211/" -ForegroundColor Gray
    Write-Host "     * VERCEL=1" -ForegroundColor Gray
    Write-Host "   - Deploy !" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "5. 🔗 Connecter Frontend ↔ Backend :" -ForegroundColor Cyan
    Write-Host "   - Copiez l'URL de votre backend" -ForegroundColor White
    Write-Host "   - Dans Frontend Vercel > Environment Variables" -ForegroundColor White
    Write-Host "   - Ajoutez: REACT_APP_API_URL=https://votre-backend.vercel.app" -ForegroundColor White
    Write-Host "   - Redéployez le frontend" -ForegroundColor White
    Write-Host ""
    
    Write-Host "🎉 TERMINÉ ! Votre app sera accessible via les URLs Vercel !" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Erreur lors du push vers GitHub :" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Vérifiez que :" -ForegroundColor Yellow
    Write-Host "   - L'URL du repository est correcte" -ForegroundColor White
    Write-Host "   - Vous êtes connecté à GitHub (git config user.name/email)" -ForegroundColor White
    Write-Host "   - Le repository existe sur GitHub" -ForegroundColor White
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer..."
