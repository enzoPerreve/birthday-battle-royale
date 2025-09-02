export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { gameId, round } = req.body || {};
      
      if (!gameId) {
        return res.status(400).json({
          success: false,
          message: 'Game ID is required'
        });
      }

      // Simuler un système de bataille avec éliminations aléatoires
      const participants = [
        { id: 'user_1', name: 'Alice', eliminated: false },
        { id: 'user_2', name: 'Bob', eliminated: false },
        { id: 'user_3', name: 'Charlie', eliminated: false },
        { id: 'user_4', name: 'Diana', eliminated: false }
      ];

      // Éliminer aléatoirement 1-2 participants
      const activeParticipants = participants.filter(p => !p.eliminated);
      const toEliminate = Math.min(Math.floor(Math.random() * 2) + 1, activeParticipants.length - 1);
      
      const eliminated = [];
      for (let i = 0; i < toEliminate; i++) {
        const randomIndex = Math.floor(Math.random() * activeParticipants.length);
        const participant = activeParticipants.splice(randomIndex, 1)[0];
        participant.eliminated = true;
        participant.eliminatedAt = new Date().toISOString();
        eliminated.push(participant);
      }

      const battleResult = {
        gameId,
        round: round || 1,
        timestamp: new Date().toISOString(),
        eliminated,
        remaining: activeParticipants,
        battleEvents: [
          `Round ${round || 1} commenced!`,
          ...eliminated.map(p => `${p.name} has been eliminated!`),
          `${activeParticipants.length} participants remain`
        ]
      };

      return res.status(200).json({
        success: true,
        message: 'Battle executed successfully',
        data: battleResult
      });
    } catch (error) {
      console.error('Battle execution error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to execute battle',
        error: error.message
      });
    }
  }

  if (req.method === 'GET') {
    const { gameId } = req.query;
    
    if (!gameId) {
      return res.status(400).json({
        success: false,
        message: 'Game ID is required'
      });
    }

    // Retourner l'historique des batailles pour un jeu
    const battleHistory = [
      {
        round: 1,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        eliminated: [{ id: 'user_5', name: 'Eve' }],
        remaining: 4
      },
      {
        round: 2,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        eliminated: [{ id: 'user_6', name: 'Frank' }],
        remaining: 3
      }
    ];

    return res.status(200).json({
      success: true,
      message: 'Battle history retrieved',
      data: {
        gameId,
        battles: battleHistory
      }
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
