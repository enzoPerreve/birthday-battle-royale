// api/participants.js - Netlify Function format

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

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Participants retrieved successfully',
        data: mockUsers,
        total: mockUsers.length
      })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      success: false,
      message: `Method ${event.httpMethod} not allowed`
    })
  };
};

