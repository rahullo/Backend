const { generateRoadmap } = require('../services/aiService');

async function generate(req, res, next) {
  try {
    const { goal, duration = '30 days' } = req.body;
    if (!goal) return res.status(400).json({ message: 'goal is required' });

    const roadmap = await generateRoadmap(goal, duration);
    return res.json({ roadmap });
  } catch (err) {
    return next(err);
  }
}

module.exports = { generate };
