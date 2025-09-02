# 🎮 Birthday Battle Royale

Une application web interactive pour organiser des batailles d'anniversaire épiques avec des quiz, jeux musicaux et défis créatifs !

## 🌟 Fonctionnalités

### Pour les Participants
- 📝 **Inscription simple** avec photo et préférences
- 🎮 **Jeux interactifs** : Quiz, Musique, Paroles
- 🏆 **Leaderboard** en temps réel
- 📱 **Interface mobile** responsive
- 🎯 **Système de points** compétitif

### Pour l'Administrateur
- 🎲 **Création de jeux** personnalisés
- ⚔️ **Gestion des battles** (1v1, 2v2, 3v3, free-for-all)
- 📊 **Dashboard admin** complet
- 📢 **Notifications** aux participants
- 🔧 **Token sécurisé** : `Agathe0211/`

## 🚀 Déploiement

Cette application est prête pour le déploiement sur **Vercel** avec auto-deploy depuis GitHub.

### URLs de Production
- **Frontend** : https://birthday-battle-royale.vercel.app
- **Backend API** : https://birthday-battle-api.vercel.app
- **Admin Panel** : https://birthday-battle-royale.vercel.app/admin

### Configuration Rapide
1. Forkez ce repository
2. Connectez-le à Vercel
3. Configurez les variables d'environnement
4. Auto-deploy activé ! 🎉

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions détaillées.
- **Responsive Design**: Works on desktop, mobile, and projection screens
- **Retro Arcade Theme**: Pixel art styling with festive elements

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Database**: Firebase Firestore
- **File Storage**: Firebase Storage
- **Authentication**: Admin token-based
- **Notifications**: Nodemailer integration

### Frontend (React)
- **Routing**: React Router
- **Styling**: Custom CSS with pixel art theme
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore and Storage enabled

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd ../
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## 📱 Usage

### For Participants
1. **Register**: Visit `/register` to create your battle profile
2. **View Players**: Check out other participants at `/participants`
3. **Read Rules**: Learn the battle rules at `/rules`

### For Admins
1. **Access Admin Panel**: Visit `/admin` and enter your admin token
2. **Generate Battles**: Create random battles with different formats
3. **Manage Participants**: View and manage registered users
4. **Send Notifications**: Alert participants about upcoming battles

## 🎮 Battle Types

- **1v1 Duel**: Classic one-on-one combat
- **2v2 Team**: Partner battles
- **3v3 Squad**: Team-based warfare
- **Free-for-All**: Everyone for themselves

## 🎨 Design System

### Colors
- Background: `#0A1A2F` (Midnight Blue)
- Text: `#F2F2F2` (Off White)
- Accent: `#FF2D2D` (Battle Red)
- Highlight: `#FFD700` (Victory Gold)
- Buttons: `#D62828` (Action Red)

### Typography
- **Titles**: Press Start 2P (pixel art)
- **Body**: Montserrat (readable)

## 🔧 API Endpoints

### Users
- `POST /api/users/register` - Register new participant
- `GET /api/users/participants` - Get all participants
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Battles
- `GET /api/battles` - Get all battles
- `GET /api/battles/active` - Get active battles
- `POST /api/battles` - Create battle (admin)
- `POST /api/battles/random` - Generate random battle (admin)
- `PUT /api/battles/:id/status` - Update battle status (admin)

## 🔐 Security

- Admin routes protected by token authentication
- Input validation and sanitization
- File upload restrictions (images only, 5MB max)
- CORS configuration for frontend-backend communication

## 📧 Notifications

The system supports email notifications for:
- Welcome messages for new participants
- Battle alerts and announcements
- Admin notifications

Configure SMTP settings in the backend `.env` file.

## 🎯 Production Deployment

### Backend
1. Set up a production Firebase project
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend
1. Update `REACT_APP_API_URL` to your production backend
2. Build the project: `npm run build`
3. Deploy to Netlify, Vercel, or similar platform

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error**
- Verify Firebase credentials in `.env`
- Ensure Firestore and Storage are enabled
- Check network connectivity

**File Upload Fails**
- Verify Firebase Storage rules
- Check file size limits (5MB max)
- Ensure proper MIME type (images only)

**Admin Access Denied**
- Set `ADMIN_SECRET` in backend `.env`
- Use the correct admin token in frontend

## 🎉 Party Tips

1. **QR Code Registration**: Create QR codes linking to `/register` for easy access
2. **Projection Display**: Use `/participants` on a large screen
3. **Battle Timing**: Generate battles every 20 minutes for optimal flow
4. **Winner Tracking**: Use admin panel to record battle outcomes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Have Fun!

Remember, the most important rule is to have fun and create awesome memories at your birthday battle royale! 🎉🏆

---

**Built with ❤️ for epic birthday celebrations**
