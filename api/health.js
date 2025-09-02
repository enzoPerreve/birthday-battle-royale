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

  // Simple health check
  return res.status(200).json({
    success: true,
    message: 'Health check OK!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
