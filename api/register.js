// api/register.js - Netlify Function format with local storage fallback
// Temporary solution while Firebase Firestore is being activated

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle pre-flight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { name, contact, phrase } = body;

      if (!name || !contact) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Name and contact are required.' })
        };
      }
      
      // Create participant data (temporary local mode)
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        contact: contact.trim(),
        phrase: phrase?.trim() || 'Ready to battle!',
        registeredAt: new Date().toISOString(),
        gamesPlayed: 0,
        gamesWon: 0,
        currentGameId: null,
        status: 'active',
        lastActive: new Date().toISOString()
      };

      // Simulate successful registration (no Firebase for now)
      console.log('Participant registered (local simulation):', newUser);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User registered successfully! (Temporary local mode)',
          data: newUser,
          note: 'Firebase Firestore will be connected soon for persistent storage'
        })
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Registration failed due to a server error.',
          error: error.message
        })
      };
    }
  }

  // GET method for endpoint status
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      message: 'Registration endpoint is ready (local mode)',
      timestamp: new Date().toISOString(),
      note: 'Firestore integration pending activation'
    })
  };
};

