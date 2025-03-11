// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Import User model

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId); // Use findByPk

    if (!user) {
        throw new Error(); // Will be caught in the catch block
    }

    req.user = user; // Attach the user object to the request
    req.token = token; // Attach the token to the request (optional)
    next();
  } catch (error) {
      console.error("Authentication error:", error);
      res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};