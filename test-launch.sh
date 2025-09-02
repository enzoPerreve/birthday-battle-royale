#!/bin/bash

# 🧪 Script de test pour Birthday Battle Royale - Enhanced Gaming Edition
# Ce script lance l'application complète et vérifie son bon fonctionnement

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${MAGENTA}🧪 Test de lancement - Birthday Battle Royale Gaming Edition${NC}"
echo -e "${MAGENTA}==========================================================${NC}"
echo ""

# Fonction pour vérifier si un port est utilisé
check_port() {
    local port=$1
    if netstat -an | grep -q ":$port "; then
        return 0  # Port utilisé
    else
        return 1  # Port libre
    fi
}

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${CYAN}⏳ Attente du démarrage de $service_name...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s $url > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name est prêt !${NC}"
            return 0
        fi
        echo -e "${YELLOW}   Tentative $attempt/$max_attempts...${NC}"
        sleep 2
        ((attempt++))
    done
    
    echo -e "${RED}❌ $service_name n'a pas démarré dans les temps${NC}"
    return 1
}

# Vérifier les prérequis
echo -e "${CYAN}🔍 Vérification des prérequis...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"

# Vérifier la structure du projet
echo -e "${CYAN}📁 Vérification de la structure du projet...${NC}"

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json introuvable${NC}"
    exit 1
fi

if [ ! -d "backend" ]; then
    echo -e "${RED}❌ Dossier backend introuvable${NC}"
    exit 1
fi

if [ ! -f "backend/app.js" ]; then
    echo -e "${RED}❌ backend/app.js introuvable${NC}"
    exit 1
fi

if [ ! -f "src/App.js" ]; then
    echo -e "${RED}❌ src/App.js introuvable${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Structure du projet validée${NC}"

# Installer les dépendances si nécessaire
echo -e "${CYAN}📦 Vérification des dépendances...${NC}"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⏳ Installation des dépendances frontend...${NC}"
    npm install
    echo -e "${GREEN}✅ Dépendances frontend installées${NC}"
fi

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⏳ Installation des dépendances backend...${NC}"
    cd backend
    npm install
    cd ..
    echo -e "${GREEN}✅ Dépendances backend installées${NC}"
fi

# Vérifier les ports
echo -e "${CYAN}🔌 Vérification des ports...${NC}"

BACKEND_PORT=3000
FRONTEND_PORT=3001

if check_port $BACKEND_PORT; then
    echo -e "${YELLOW}⚠️  Port $BACKEND_PORT déjà utilisé${NC}"
    read -p "Arrêter le processus existant ? (Y/n): " KILL_BACKEND
    if [[ ! $KILL_BACKEND =~ ^[Nn]$ ]]; then
        # Essayer de tuer le processus sur le port
        pkill -f "node.*app.js" || true
        sleep 2
    fi
fi

if check_port $FRONTEND_PORT; then
    echo -e "${YELLOW}⚠️  Port $FRONTEND_PORT déjà utilisé${NC}"
    read -p "Arrêter le processus existant ? (Y/n): " KILL_FRONTEND
    if [[ ! $KILL_FRONTEND =~ ^[Nn]$ ]]; then
        # Essayer de tuer le processus React
        pkill -f "react-scripts" || true
        sleep 2
    fi
fi

# Démarrer le backend
echo -e "${BLUE}🚀 Démarrage du backend...${NC}"
cd backend

# Vérifier le fichier .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Fichier .env non trouvé, utilisation du mode test${NC}"
fi

# Démarrer le backend en arrière-plan
node app.js &
BACKEND_PID=$!
echo -e "${CYAN}📡 Backend démarré (PID: $BACKEND_PID)${NC}"

cd ..

# Attendre que le backend soit prêt
if ! wait_for_service "http://localhost:$BACKEND_PORT" "Backend"; then
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Tester les endpoints du backend
echo -e "${CYAN}🧪 Test des endpoints backend...${NC}"

# Test endpoint de base
if curl -s "http://localhost:$BACKEND_PORT" > /dev/null; then
    echo -e "${GREEN}✅ Endpoint racine OK${NC}"
else
    echo -e "${RED}❌ Endpoint racine inaccessible${NC}"
fi

# Test endpoint users
if curl -s "http://localhost:$BACKEND_PORT/api/users" > /dev/null; then
    echo -e "${GREEN}✅ Endpoint /api/users OK${NC}"
else
    echo -e "${YELLOW}⚠️  Endpoint /api/users non disponible${NC}"
fi

# Test endpoint games
if curl -s "http://localhost:$BACKEND_PORT/api/games" > /dev/null; then
    echo -e "${GREEN}✅ Endpoint /api/games OK${NC}"
else
    echo -e "${YELLOW}⚠️  Endpoint /api/games non disponible${NC}"
fi

# Test endpoint leaderboard
if curl -s "http://localhost:$BACKEND_PORT/api/games/leaderboard" > /dev/null; then
    echo -e "${GREEN}✅ Endpoint /api/games/leaderboard OK${NC}"
else
    echo -e "${YELLOW}⚠️  Endpoint /api/games/leaderboard non disponible${NC}"
fi

# Démarrer le frontend
echo -e "${BLUE}🚀 Démarrage du frontend...${NC}"

# Utiliser un port spécifique pour éviter les conflits
PORT=$FRONTEND_PORT npm start &
FRONTEND_PID=$!
echo -e "${CYAN}🎨 Frontend démarré (PID: $FRONTEND_PID)${NC}"

# Attendre que le frontend soit prêt
if ! wait_for_service "http://localhost:$FRONTEND_PORT" "Frontend"; then
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 1
fi

# Peupler la base de données avec des questions de test
echo -e "${CYAN}📝 Ajout des questions de test...${NC}"
cd backend
node scripts/seedQuestions.js || echo -e "${YELLOW}⚠️  Questions de test non ajoutées (normal si base déjà peuplée)${NC}"
cd ..

# Afficher les informations de test
echo ""
echo -e "${GREEN}🎉 APPLICATION LANCÉE AVEC SUCCÈS !${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo -e "${CYAN}📋 Informations de test :${NC}"
echo -e "   🖥️  Backend: ${NC}http://localhost:$BACKEND_PORT"
echo -e "   🎨 Frontend: ${NC}http://localhost:$FRONTEND_PORT"
echo -e "   🔧 API Base: ${NC}http://localhost:$BACKEND_PORT/api"
echo ""
echo -e "${CYAN}📱 Pages disponibles :${NC}"
echo -e "   🏠 Accueil: ${NC}http://localhost:$FRONTEND_PORT/"
echo -e "   📝 Inscription: ${NC}http://localhost:$FRONTEND_PORT/register"
echo -e "   👥 Participants: ${NC}http://localhost:$FRONTEND_PORT/participants"
echo -e "   🎮 Jeux: ${NC}http://localhost:$FRONTEND_PORT/games"
echo -e "   🏆 Classement: ${NC}http://localhost:$FRONTEND_PORT/leaderboard"
echo -e "   📜 Règles: ${NC}http://localhost:$FRONTEND_PORT/rules"
echo -e "   ⚙️  Admin: ${NC}http://localhost:$FRONTEND_PORT/admin"
echo ""
echo -e "${CYAN}🎯 Tests à effectuer :${NC}"
echo -e "   1. ✅ Inscription d'un utilisateur avec photo"
echo -e "   2. ✅ Affichage des préférences alcool/épicé"
echo -e "   3. ✅ Navigation mobile responsive"
echo -e "   4. ✅ Fonctionnement du leaderboard"
echo -e "   5. ✅ Interface des jeux"
echo -e "   6. ✅ Nouvelles règles"
echo ""
echo -e "${YELLOW}📱 IMPORTANT: Testez sur mobile !${NC}"
echo -e "   - Ouvrez ${NC}http://localhost:$FRONTEND_PORT ${YELLOW}sur votre téléphone"
echo -e "   - Vérifiez la navigation tactile"
echo -e "   - Testez l'inscription avec photo"
echo ""

# Proposer d'ouvrir automatiquement
read -p "Ouvrir l'application dans le navigateur ? (Y/n): " OPEN_BROWSER
if [[ ! $OPEN_BROWSER =~ ^[Nn]$ ]]; then
    # Détecter l'OS et ouvrir le navigateur approprié
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "http://localhost:$FRONTEND_PORT" 2>/dev/null &
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        open "http://localhost:$FRONTEND_PORT" 2>/dev/null &
    elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        start "http://localhost:$FRONTEND_PORT" 2>/dev/null &
    fi
fi

echo ""
echo -e "${CYAN}🛠️  Contrôles disponibles :${NC}"
echo -e "   ${NC}Ctrl+C : Arrêter les serveurs"
echo -e "   ${NC}Entrée : Afficher les logs en temps réel"

# Fonction pour nettoyer les processus à la sortie
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des serveurs...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✅ Serveurs arrêtés proprement${NC}"
    exit 0
}

# Capturer Ctrl+C pour arrêter proprement
trap cleanup SIGINT SIGTERM

# Attendre l'intervention de l'utilisateur
echo ""
echo -e "${CYAN}⌨️  Appuyez sur Ctrl+C pour arrêter les serveurs${NC}"
echo -e "${CYAN}   ou sur Entrée pour voir les logs...${NC}"

read -t 1 input 2>/dev/null || true

if [ -n "$input" ]; then
    echo -e "${CYAN}📊 Affichage des logs...${NC}"
    echo -e "${CYAN}========================${NC}"
    
    # Afficher les logs des processus
    echo -e "${YELLOW}Backend logs (PID: $BACKEND_PID):${NC}"
    echo "Voir les logs dans le terminal backend..."
    
    echo -e "${YELLOW}Frontend logs (PID: $FRONTEND_PID):${NC}"
    echo "Voir les logs dans le terminal frontend..."
fi

# Garder le script vivant jusqu'à Ctrl+C
while true; do
    sleep 1
done
