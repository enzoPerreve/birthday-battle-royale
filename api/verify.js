export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
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

  // GET method for endpoint status
  return res.status(200).json({
    success: true,
    message: 'Admin verification endpoint is ready',
    timestamp: new Date().toISOString()
  });
}
