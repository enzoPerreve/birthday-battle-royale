export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Log the request for debugging
  console.log(`${req.method} ${req.url}`, req.body);

  // Normalize URL (remove /api prefix if present)
  const normalizedUrl = req.url.replace(/^\/api/, '') || '/';

  // Health check
  if ((normalizedUrl === '/health' || req.url === '/api/health') && req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'API is working perfectly!',
      timestamp: new Date().toISOString(),
      url: req.url,
      normalizedUrl: normalizedUrl,
      method: req.method
    });
  }

  // User registration
  if (normalizedUrl === '/users/register' || req.url === '/api/users/register') {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        message: 'Registration endpoint is ready',
        timestamp: new Date().toISOString()
      });
    }

    if (req.method === 'POST') {
      try {
        const { name, contact, phrase } = req.body || {};
        
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: name || 'Anonymous User',
          contact: contact || 'unknown@example.com',
          phrase: phrase || 'Ready to battle!',
          registeredAt: new Date().toISOString()
        };

        return res.status(201).json({
          success: true,
          message: 'User registered successfully!',
          data: user
        });
      } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
          success: false,
          message: 'Registration failed',
          error: error.message
        });
      }
    }
  }

  // Admin token check
  if ((normalizedUrl === '/admin/verify' || req.url === '/api/admin/verify') && req.method === 'POST') {
    const { token } = req.body || {};
    const adminToken = req.headers['x-admin-token'] || token;

    if (adminToken === 'Agathe0211/') {
      return res.status(200).json({
        success: true,
        message: 'Admin access granted',
        data: { isAdmin: true }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin token'
      });
    }
  }

  // Games endpoint
  if ((normalizedUrl === '/games' || req.url === '/api/games') && req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: []
    });
  }

  // Users list
  if ((normalizedUrl === '/users/participants' || req.url === '/api/users/participants') && req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: [
        { id: '1', name: 'Test User 1', phrase: 'Ready!', points: 100 },
        { id: '2', name: 'Test User 2', phrase: 'Let\'s go!', points: 85 }
      ]
    });
  }

  // Default response
  return res.status(200).json({
    success: true,
    message: '🎮 Birthday Battle Royale API 🎮',
    version: '1.0.0-unified',
    timestamp: new Date().toISOString(),
    requestInfo: {
      method: req.method,
      url: req.url,
      body: req.body
    },
    availableEndpoints: [
      'GET /api/health',
      'POST /api/users/register',
      'GET /api/users/participants',
      'POST /api/admin/verify',
      'GET /api/games'
    ]
  });
}
