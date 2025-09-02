#!/bin/bash

# 🚀 Script de déploiement rapide pour Birthday Battle Royale

echo "🎮 Déploiement Birthday Battle Royale sur Vercel..."

# Vérification que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Build du frontend
echo "🔨 Build du frontend..."
npm run build

# Installation des dépendances backend
echo "📦 Installation des dépendances backend..."
cd backend
npm install
cd ..

# Déploiement avec Vercel CLI (si installé)
if command -v vercel &> /dev/null; then
    echo "🚀 Déploiement avec Vercel CLI..."
    
    # Déploiement du frontend
    echo "📱 Déploiement Frontend..."
    vercel --prod
    
    # Déploiement du backend
    echo "🖥️ Déploiement Backend..."
    cd backend
    vercel --prod
    cd ..
    
    echo "✅ Déploiement terminé!"
    echo "🌐 Vérifiez vos URLs sur https://vercel.com/dashboard"
else
    echo "⚠️ Vercel CLI non installé."
    echo "📝 Suivez les instructions dans DEPLOYMENT.md pour déployer manuellement"
    echo "💡 Ou installez Vercel CLI: npm i -g vercel"
fi

echo "🎉 Script terminé!"
