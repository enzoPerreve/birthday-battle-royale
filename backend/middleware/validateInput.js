const validateUserInput = (req, res, next) => {
  const { name, contact } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Name is required and must be a non-empty string'
    });
  }

  if (!contact || typeof contact !== 'string' || contact.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Contact is required and must be a non-empty string'
    });
  }

  // Validate email or phone format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  
  if (!emailRegex.test(contact) && !phoneRegex.test(contact.replace(/\s/g, ''))) {
    return res.status(400).json({
      success: false,
      message: 'Contact must be a valid email or phone number'
    });
  }

  // Sanitize name
  req.body.name = name.trim();
  req.body.contact = contact.trim();

  next();
};

const validateBattleInput = (req, res, next) => {
  const { type } = req.body;
  
  if (!type || typeof type !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Battle type is required'
    });
  }

  const validTypes = ['1v1', '2v2', '3v3', '4v4', 'team', 'free-for-all'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Invalid battle type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  next();
};

module.exports = {
  validateUserInput,
  validateBattleInput
};