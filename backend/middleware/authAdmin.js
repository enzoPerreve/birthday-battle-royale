const authAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.replace('Bearer ', '');
  
  console.log('🔐 Auth Admin Check:');
  console.log('  - Token received:', token ? `"${token}"` : 'NONE');
  console.log('  - Expected token:', `"${process.env.ADMIN_SECRET}"`);
  console.log('  - Headers:', JSON.stringify(req.headers, null, 2));
  
  if (!token) {
    console.log('  ❌ No token provided');
    return res.status(401).json({
      success: false,
      message: 'Admin token required'
    });
  }

  if (token !== process.env.ADMIN_SECRET) {
    console.log('  ❌ Invalid token');
    return res.status(403).json({
      success: false,
      message: 'Invalid admin token'
    });
  }
  
  console.log('  ✅ Token valid - Admin access granted');
  next();
};

module.exports = authAdmin;