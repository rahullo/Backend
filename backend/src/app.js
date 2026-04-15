const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const aiRoutes = require('./routes/aiRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.get('/health', (_req, res) => res.json({ ok: true, service: 'goalpilot-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

module.exports = app;
