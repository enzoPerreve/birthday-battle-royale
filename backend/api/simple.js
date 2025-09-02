const express = require('express');
const cors = require('cors');

const app = express();

// Middleware simple
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Test simple pour diagnostic
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Route de test pour POST
app.post('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'POST is working!',
    data: req.body
  });
});

// Route simplifiée pour registration
app.post('/api/users/register', (req, res) => {
  console.log('Register request received:', req.body);
  
  try {
    // Simulation d'une inscription réussie
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: req.body.name || 'Test User',
      phrase: req.body.phrase || 'Ready to play!',
      contact: req.body.contact || 'test@example.com'
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: mockUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Route pour récupérer les utilisateurs
app.get('/api/users/participants', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '1', name: 'Test User 1', phrase: 'Ready!', points: 100 },
      { id: '2', name: 'Test User 2', phrase: 'Let\'s go!', points: 85 }
    ]
  });
});

// Routes pour les jeux (mock)
app.get('/api/games', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Birthday Battle Royale API - SIMPLE VERSION 🎮',
    version: '1.0.0-simple',
    status: 'working'
  });
});

// Export for Vercel
module.exports = app;
