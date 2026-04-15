const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
    resources: [String],
    completed: { type: Boolean, default: false },
    completedAt: Date,
  },
  { _id: false }
);

const weekSchema = new mongoose.Schema(
  {
    week: Number,
    focus: String,
    tasks: [taskSchema],
  },
  { _id: false }
);

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    duration: { type: String, default: '30 days' },
    weeks: [weekSchema],
    progressPercent: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
