// api/users.js - Netlify Function format

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

export const handler = async (event, context) => {
  // CORS headers for Netlify
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle pre-flight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No Content
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
        data: participants,
        total: participants.length,
        timestamp: new Date().toISOString()
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

