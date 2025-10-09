// In backend/middleware/adminMiddleware.js
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    // We assume authMiddleware has already run and added req.user
    const user = await User.findById(req.user.id);

    if (user && user.role === 'admin') {
      next(); // User is an admin, proceed to the route
    } else {
      res.status(403).json({ message: 'Access denied. Admin rights required.' });
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

module.exports = adminMiddleware;