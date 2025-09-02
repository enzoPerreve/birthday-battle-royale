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
    const { gameId, userId, limit } = req.query;

    let notifications = [
      {
        id: 'notif_1',
        type: 'game_start',
        title: 'Game Started!',
        message: 'Birthday Battle Royale #3 has begun!',
        gameId: 'game_3',
        userId: null, // broadcast to all
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: false
      },
      {
        id: 'notif_2',
        type: 'elimination',
        title: 'Player Eliminated',
        message: 'Bob has been eliminated from the game',
        gameId: 'game_2',
        userId: 'user_1',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        read: false
      },
      {
        id: 'notif_3',
        type: 'victory',
        title: 'Congratulations! 🏆',
        message: 'You won Birthday Battle Royale #1!',
        gameId: 'game_1',
        userId: 'user_1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      {
        id: 'notif_4',
        type: 'game_invite',
        title: 'Game Invitation',
        message: 'You have been invited to join Birthday Battle Royale #4',
        gameId: 'game_4',
        userId: 'user_2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false
      }
    ];

    // Filtrer par jeu
    if (gameId) {
      notifications = notifications.filter(n => n.gameId === gameId);
    }

    // Filtrer par utilisateur
    if (userId) {
      notifications = notifications.filter(n => n.userId === userId || n.userId === null);
    }

    // Limiter le nombre de résultats
    if (limit) {
      notifications = notifications.slice(0, parseInt(limit));
    }

    return res.status(200).json({
      success: true,
      message: 'Notifications retrieved successfully',
      data: notifications,
      unreadCount: notifications.filter(n => !n.read).length
    });
  }

  if (req.method === 'POST') {
    try {
      const { type, title, message, gameId, userId, broadcast = false } = req.body || {};

      if (!type || !title || !message) {
        return res.status(400).json({
          success: false,
          message: 'Type, title and message are required'
        });
      }

      const newNotification = {
        id: `notif_${Math.random().toString(36).substr(2, 9)}`,
        type,
        title,
        message,
        gameId: gameId || null,
        userId: broadcast ? null : userId,
        timestamp: new Date().toISOString(),
        read: false
      };

      return res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: newNotification
      });
    } catch (error) {
      console.error('Notification creation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create notification',
        error: error.message
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { notificationId, read } = req.body || {};

      if (!notificationId) {
        return res.status(400).json({
          success: false,
          message: 'Notification ID is required'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Notification updated successfully',
        data: {
          id: notificationId,
          read: read !== undefined ? read : true,
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Notification update error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update notification',
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
