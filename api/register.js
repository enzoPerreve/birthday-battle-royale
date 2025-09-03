// api/register.js - Netlify Function format

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
      
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || 'Anonymous User',
        contact: contact || 'unknown@example.com',
        phrase: phrase || 'Ready to battle!',
        registeredAt: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User registered successfully!',
          data: user
        })
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Registration failed',
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
      message: 'Registration endpoint is ready',
      timestamp: new Date().toISOString()
    })
  };
};

