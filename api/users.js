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
    // Return participants data
    const participants = [
      {
        id: 'user_1',
        name: 'Alice Martin',
        contact: 'alice@example.com',
        phrase: 'Prête à gagner !',
        registeredAt: '2025-09-02T17:48:58.104Z',
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
        registeredAt: '2025-09-02T18:48:58.104Z',
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
        registeredAt: '2025-09-02T19:48:58.104Z',
        gamesPlayed: 1,
        gamesWon: 1,
        currentGameId: 'game_1',
        status: 'active'
      },
      {
        id: 'user_4',
        name: 'Sophie Dubois',
        contact: 'sophie@example.com', 
        phrase: 'Ready for action!',
        registeredAt: '2025-09-02T20:48:58.104Z',
        gamesPlayed: 5,
        gamesWon: 2,
        currentGameId: 'game_1',
        status: 'active'
      },
      {
        id: 'user_5',
        name: 'Lucas Bernard',
        contact: 'lucas@example.com',
        phrase: 'Game on!',
        registeredAt: '2025-09-02T21:48:58.104Z',
        gamesPlayed: 4,
        gamesWon: 1,
        currentGameId: 'game_2',
        status: 'active'
      }
    ];

    return res.status(200).json({
      success: true,
      message: 'Participants retrieved successfully',
      data: participants,
      total: participants.length,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
