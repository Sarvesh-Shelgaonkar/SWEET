module.exports = function adminOnly(req, res, next) {
    if (!req.user || !req.user.isAdminRole) return res.status(403).json({ message: 'Admin only' });
    next();
  };
  