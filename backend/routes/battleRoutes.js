const express = require('express');
const router = express.Router();
const battleController = require('../controllers/battleController');
const { validateBattleInput } = require('../middleware/validateInput');
const authAdmin = require('../middleware/authAdmin');
const notificationService = require('../services/notificationService');

// Public routes
router.get('/', battleController.getAllBattles);
router.get('/active', battleController.getActiveBattles);
router.get('/:id', battleController.getBattleById);

// Admin routes
router.post('/test-admin', authAdmin, (req, res) => {
  res.json({ success: true, message: 'Admin token valid' });
});
router.post('/', authAdmin, validateBattleInput, battleController.createBattle);
router.post('/random', authAdmin, battleController.generateRandomBattle);
router.put('/:id/status', authAdmin, battleController.updateBattleStatus);
router.put('/:id/winner', authAdmin, battleController.setBattleWinner);

// Notification route
router.post('/notify', authAdmin, notificationService.sendNotification.bind(notificationService));

module.exports = router;