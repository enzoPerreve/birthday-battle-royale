// API endpoint for user registration
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different HTTP methods
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'User registration endpoint is working',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, contact, phrase } = req.body;
      
      // Simple registration mock
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || 'Anonymous',
        contact: contact || 'unknown@example.com',
        phrase: phrase || 'Ready to play!',
        registeredAt: new Date().toISOString()
      };

      return res.status(201).json({
        success: true,
        message: 'User registered successfully!',
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
}
