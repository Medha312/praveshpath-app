const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get token from the request header
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token or malformed token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];

  // 2. Check if there is no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. If there is a token, verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add the user payload to the request object
    next(); // Move on to the next function (the actual route logic)
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};