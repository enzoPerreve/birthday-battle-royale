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
    const mockUsers = [
      {
        id: 'user_1',
        name: 'Alice Martin',
        contact: 'alice@example.com',
        phrase: 'Prête à gagner !',
        registeredAt: new Date(Date.now() - 86400000).toISOString(),
        gamesPlayed: 3,
        gamesWon: 1,
        currentGameId: 'game_2',
        status: 'active'
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

    return res.status(200).json({
      success: true,
      message: 'Participants retrieved successfully',
      data: mockUsers,
      total: mockUsers.length
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
