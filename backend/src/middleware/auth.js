const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.substring(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = user;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = auth;
