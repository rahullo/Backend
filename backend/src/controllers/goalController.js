const Goal = require('../models/Goal');

function calculateProgress(weeks) {
  const allTasks = weeks.flatMap((w) => w.tasks);
  const completed = allTasks.filter((t) => t.completed).length;
  return allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0;
}

async function listGoals(req, res, next) {
  try {
    const goals = await Goal.find({ userId: req.user._id, isArchived: false }).sort({ createdAt: -1 });
    return res.json({ goals });
  } catch (err) {
    return next(err);
  }
}

async function createGoal(req, res, next) {
  try {
    const { goal, duration, weeks = [] } = req.body;
    const freeLimit = Number(process.env.FREE_GOAL_LIMIT || 2);

    if (!req.user.subscription.isActive) {
      const count = await Goal.countDocuments({ userId: req.user._id, isArchived: false });
      if (count >= freeLimit) {
        return res.status(402).json({ message: 'Free goal limit reached. Upgrade to Pro.' });
      }
    }

    const progressPercent = calculateProgress(weeks);
    const created = await Goal.create({ userId: req.user._id, goal, duration, weeks, progressPercent });
    return res.status(201).json({ goal: created });
  } catch (err) {
    return next(err);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    const { goalId, week, day, completed } = req.body;
    const goal = await Goal.findOne({ _id: goalId, userId: req.user._id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    const weekItem = goal.weeks.find((w) => w.week === Number(week));
    const task = weekItem?.tasks.find((t) => t.day === Number(day));
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = completed;
    task.completedAt = completed ? new Date() : undefined;
    goal.progressPercent = calculateProgress(goal.weeks);
    await goal.save();

    if (completed) {
      const now = new Date();
      const last = req.user.lastTaskCompletionDate;
      const isNextDay = last && Math.floor((now - last) / (1000 * 60 * 60 * 24)) === 1;
      req.user.streakCount = isNextDay ? req.user.streakCount + 1 : 1;
      req.user.lastTaskCompletionDate = now;
      await req.user.save();
    }

    return res.json({ goal, streakCount: req.user.streakCount });
  } catch (err) {
    return next(err);
  }
}

module.exports = { listGoals, createGoal, updateTaskStatus };
