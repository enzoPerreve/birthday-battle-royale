// api/verify.js - Netlify Function format

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
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
      const tokenFromHeader = event.headers['x-admin-token'];
      const adminToken = tokenFromHeader || body.token;

      if (adminToken === 'Agathe0211/') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Admin access granted',
            data: { isAdmin: true }
          })
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid admin token'
          })
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid request body'
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
      message: 'Admin verification endpoint is ready',
      timestamp: new Date().toISOString()
    })
  };
};

