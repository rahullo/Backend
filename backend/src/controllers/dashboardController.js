const Goal = require('../models/Goal');

async function summary(req, res, next) {
  try {
    const goals = await Goal.find({ userId: req.user._id, isArchived: false });
    const activeGoals = goals.length;
    const completedTasks = goals
      .flatMap((g) => g.weeks)
      .flatMap((w) => w.tasks)
      .filter((t) => t.completed).length;

    const avgProgress = goals.length
      ? Math.round(goals.reduce((sum, g) => sum + g.progressPercent, 0) / goals.length)
      : 0;

    return res.json({
      activeGoals,
      completedTasks,
      avgProgress,
      streakCount: req.user.streakCount,
      subscription: req.user.subscription,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { summary };
