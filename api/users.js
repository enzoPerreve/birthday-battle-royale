// api/users.js - Netlify Function format with temporary mock data
// Will be updated to use Firebase when Firestore is activated

// Temporary mock data for testing
const temporaryParticipants = [
  {
    id: 'temp_user_1',
    name: 'Alice Martin',
    contact: 'alice@example.com',
    phrase: 'Prête à gagner !',
    registeredAt: '2025-09-03T18:00:00.000Z',
    gamesPlayed: 3,
    gamesWon: 1,
    currentGameId: 'game_2',
    status: 'active'
  },
  {
    id: 'temp_user_2', 
    name: 'Bob Durand',
    contact: 'bob@example.com',
    phrase: 'Let\'s battle!',
    registeredAt: '2025-09-03T18:30:00.000Z',
    gamesPlayed: 2,
    gamesWon: 0,
    currentGameId: null,
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
    try {
      // Return temporary mock data
      console.log('Returning temporary participants (local mode)');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Participants retrieved successfully (temporary local mode)',
          data: temporaryParticipants,
          count: temporaryParticipants.length,
          timestamp: new Date().toISOString(),
          note: 'Using mock data - Firebase Firestore will be connected soon'
        })
      };
    } catch (error) {
      console.error('Error fetching participants:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Failed to fetch participants',
          error: error.message
        })
      };
    }
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

