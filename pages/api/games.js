export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Simuler une base de données en mémoire (en production, utiliser une vraie DB)
  const games = [
    {
      id: 'game_1',
      name: 'Birthday Battle Royale #1',
      status: 'waiting', // waiting, active, completed
      participants: [],
      maxParticipants: 10,
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      winner: null,
      currentRound: 0,
      totalRounds: 3
    },
    {
      id: 'game_2', 
      name: 'Birthday Battle Royale #2',
      status: 'active',
      participants: [
        { id: 'user_1', name: 'Alice', eliminated: false },
        { id: 'user_2', name: 'Bob', eliminated: true }
      ],
      maxParticipants: 8,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      startedAt: new Date(Date.now() - 1800000).toISOString(),
      completedAt: null,
      winner: null,
      currentRound: 2,
      totalRounds: 3
    }
  ];

  if (req.method === 'GET') {
    const { status, limit } = req.query;
    
    let filteredGames = games;
    
    // Filtrer par statut si spécifié
    if (status) {
      filteredGames = games.filter(game => game.status === status);
    }
    
    // Limiter le nombre de résultats
    if (limit) {
      filteredGames = filteredGames.slice(0, parseInt(limit));
    }

    return res.status(200).json({
      success: true,
      message: 'Games retrieved successfully',
      data: filteredGames,
      total: filteredGames.length
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, maxParticipants = 10 } = req.body || {};
      
      const newGame = {
        id: `game_${Math.random().toString(36).substr(2, 9)}`,
        name: name || `Birthday Battle Royale #${games.length + 1}`,
        status: 'waiting',
        participants: [],
        maxParticipants: Math.min(Math.max(maxParticipants, 2), 50), // Entre 2 et 50
        createdAt: new Date().toISOString(),
        startedAt: null,
        completedAt: null,
        winner: null,
        currentRound: 0,
        totalRounds: 3
      };

      return res.status(201).json({
        success: true,
        message: 'Game created successfully',
        data: newGame
      });
    } catch (error) {
      console.error('Game creation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create game',
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
