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
      const { gameId, userId } = req.body || {};
      
      if (!gameId || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Game ID and User ID are required'
        });
      }

      // Simuler l'ajout d'un utilisateur à un jeu
      const participant = {
        userId,
        joinedAt: new Date().toISOString(),
        status: 'active',
        eliminated: false,
        position: null
      };

      return res.status(200).json({
        success: true,
        message: 'User joined game successfully',
        data: {
          gameId,
          participant
        }
      });
    } catch (error) {
      console.error('Join game error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to join game',
        error: error.message
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { gameId, userId } = req.body || {};
      
      if (!gameId || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Game ID and User ID are required'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User left game successfully',
        data: { gameId, userId }
      });
    } catch (error) {
      console.error('Leave game error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to leave game',
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
