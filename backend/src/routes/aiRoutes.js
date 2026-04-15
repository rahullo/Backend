const router = require('express').Router();
const auth = require('../middleware/auth');
const { generate } = require('../controllers/aiController');

router.post('/generate-roadmap', auth, generate);

module.exports = router;
