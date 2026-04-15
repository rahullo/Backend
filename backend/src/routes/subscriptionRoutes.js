const express = require('express');
const auth = require('../middleware/auth');
const { createCheckout, webhook } = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/checkout', auth, createCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

module.exports = router;
