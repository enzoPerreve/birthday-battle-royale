export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier les permissions admin
  const adminToken = req.headers['x-admin-token'] || req.body?.adminToken;
  if (adminToken !== 'Agathe0211/') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }

  if (req.method === 'POST') {
    try {
      const { gameId, action } = req.body || {};
      
      if (!gameId || !action) {
        return res.status(400).json({
          success: false,
          message: 'Game ID and action are required'
        });
      }

      let message = '';
      let gameStatus = '';

      switch (action) {
        case 'start':
          message = 'Game started successfully';
          gameStatus = 'active';
          break;
        case 'pause':
          message = 'Game paused successfully';
          gameStatus = 'paused';
          break;
        case 'resume':
          message = 'Game resumed successfully';
          gameStatus = 'active';
          break;
        case 'end':
          message = 'Game ended successfully';
          gameStatus = 'completed';
          break;
        case 'reset':
          message = 'Game reset successfully';
          gameStatus = 'waiting';
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid action. Use: start, pause, resume, end, or reset'
          });
      }

      return res.status(200).json({
        success: true,
        message,
        data: {
          gameId,
          action,
          newStatus: gameStatus,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Game control error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to control game',
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
