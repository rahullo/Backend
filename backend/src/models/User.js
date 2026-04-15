const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    fcmTokens: [{ type: String }],
    subscription: {
      isActive: { type: Boolean, default: false },
      plan: { type: String, default: 'free' },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      currentPeriodEnd: Date,
    },
    streakCount: { type: Number, default: 0 },
    lastTaskCompletionDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
