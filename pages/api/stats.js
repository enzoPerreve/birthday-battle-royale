export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { gameId, userId, type } = req.query;

    // Statistiques générales
    if (!gameId && !userId) {
      const globalStats = {
        totalGames: 15,
        activeGames: 3,
        completedGames: 12,
        totalUsers: 47,
        activeUsers: 23,
        topPlayers: [
          { name: 'Alice Martin', wins: 5, gamesPlayed: 8 },
          { name: 'Charlie Moreau', wins: 4, gamesPlayed: 6 },
          { name: 'Diana Prince', wins: 3, gamesPlayed: 7 }
        ],
        recentWinners: [
          { name: 'Alice Martin', gameId: 'game_12', wonAt: new Date(Date.now() - 86400000).toISOString() },
          { name: 'Bob Durand', gameId: 'game_11', wonAt: new Date(Date.now() - 172800000).toISOString() }
        ]
      };

      return res.status(200).json({
        success: true,
        message: 'Global statistics retrieved',
        data: globalStats
      });
    }

    // Statistiques d'un jeu spécifique
    if (gameId && !userId) {
      const gameStats = {
        gameId,
        name: 'Birthday Battle Royale #2',
        status: 'completed',
        participants: 8,
        rounds: 3,
        duration: '45 minutes',
        winner: { id: 'user_1', name: 'Alice Martin' },
        eliminationOrder: [
          { round: 1, eliminated: ['Bob', 'Charlie'] },
          { round: 2, eliminated: ['Diana', 'Eve'] },
          { round: 3, eliminated: ['Frank', 'Grace', 'Henry'] }
        ],
        finalRanking: [
          { position: 1, name: 'Alice Martin', prize: '🏆' },
          { position: 2, name: 'Ivan Knox', prize: '🥈' },
          { position: 3, name: 'Julia Smith', prize: '🥉' }
        ]
      };

      return res.status(200).json({
        success: true,
        message: 'Game statistics retrieved',
        data: gameStats
      });
    }

    // Statistiques d'un utilisateur spécifique
    if (userId) {
      const userStats = {
        userId,
        name: 'Alice Martin',
        totalGames: 8,
        wins: 5,
        losses: 3,
        winRate: '62.5%',
        averagePosition: 2.1,
        totalPlayTime: '6h 30m',
        achievements: [
          { name: 'First Victory', description: 'Win your first game', unlockedAt: new Date(Date.now() - 604800000).toISOString() },
          { name: 'Hat Trick', description: 'Win 3 games in a row', unlockedAt: new Date(Date.now() - 259200000).toISOString() },
          { name: 'Battle Master', description: 'Win 5 games total', unlockedAt: new Date(Date.now() - 86400000).toISOString() }
        ],
        recentGames: [
          { gameId: 'game_12', position: 1, status: 'won', playedAt: new Date(Date.now() - 86400000).toISOString() },
          { gameId: 'game_11', position: 3, status: 'lost', playedAt: new Date(Date.now() - 172800000).toISOString() },
          { gameId: 'game_10', position: 1, status: 'won', playedAt: new Date(Date.now() - 259200000).toISOString() }
        ]
      };

      return res.status(200).json({
        success: true,
        message: 'User statistics retrieved',
        data: userStats
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters'
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
