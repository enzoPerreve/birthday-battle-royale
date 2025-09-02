export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Simuler une base de données des utilisateurs
  const users = [
    {
      id: 'user_1',
      name: 'Alice Martin',
      contact: 'alice@example.com',
      phrase: 'Prête à gagner !',
      registeredAt: new Date(Date.now() - 86400000).toISOString(),
      gamesPlayed: 3,
      gamesWon: 1,
      currentGameId: 'game_2',
      status: 'active' // active, inactive, eliminated
    },
    {
      id: 'user_2',
      name: 'Bob Durand',
      contact: 'bob@example.com', 
      phrase: 'Let\'s battle!',
      registeredAt: new Date(Date.now() - 7200000).toISOString(),
      gamesPlayed: 2,
      gamesWon: 0,
      currentGameId: null,
      status: 'inactive'
    },
    {
      id: 'user_3',
      name: 'Charlie Moreau',
      contact: 'charlie@example.com',
      phrase: 'Birthday warrior!',
      registeredAt: new Date(Date.now() - 3600000).toISOString(),
      gamesPlayed: 1,
      gamesWon: 1,
      currentGameId: 'game_1',
      status: 'active'
    }
  ];

  if (req.method === 'GET') {
    const { status, gameId, limit, search } = req.query;
    
    let filteredUsers = users;
    
    // Filtrer par statut
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    // Filtrer par jeu actuel
    if (gameId) {
      filteredUsers = filteredUsers.filter(user => user.currentGameId === gameId);
    }
    
    // Recherche par nom
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.contact.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Limiter le nombre de résultats
    if (limit) {
      filteredUsers = filteredUsers.slice(0, parseInt(limit));
    }

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: filteredUsers,
      total: filteredUsers.length
    });
  }

  if (req.method === 'DELETE') {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Vérifier les permissions admin
    const adminToken = req.headers['x-admin-token'];
    if (adminToken !== 'Agathe0211/') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    return res.status(200).json({
      success: true,
      message: `User ${userId} deleted successfully`
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
