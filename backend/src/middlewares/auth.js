const jwt=require('jsonwebtoken');
const User=require('../models/User');

const JWT_SECRET=process.env.JWT_SECRET;

module.exports = async function auth(req, res, next) 
{
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });
  
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header format' });
  
    const token = parts[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(payload.sub);
      if (!user) return res.status(401).json({ message: 'User not found' });
      req.user = { id: user._id, isAdminRole: user.isAdminRole };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };