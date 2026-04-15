const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

async function signup(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, name });

    const token = signToken({ userId: user._id.toString() });
    return res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password, fcmToken } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    if (fcmToken && !user.fcmTokens.includes(fcmToken)) {
      user.fcmTokens.push(fcmToken);
      await user.save();
    }

    const token = signToken({ userId: user._id.toString() });
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res) {
  return res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      subscription: req.user.subscription,
      streakCount: req.user.streakCount,
    },
  });
}

module.exports = { signup, login, me };
