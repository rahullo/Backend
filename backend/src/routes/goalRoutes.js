const router = require('express').Router();
const auth = require('../middleware/auth');
const { listGoals, createGoal, updateTaskStatus } = require('../controllers/goalController');

router.use(auth);
router.get('/', listGoals);
router.post('/', createGoal);
router.patch('/task-status', updateTaskStatus);

module.exports = router;
