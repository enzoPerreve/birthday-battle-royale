const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authAdmin = require('../middleware/authAdmin');

// Public routes
router.get('/active', gameController.getActiveGames);
router.get('/leaderboard', gameController.getLeaderboard);
router.get('/:id', gameController.getGameById);
router.post('/:id/join', gameController.joinGame);
router.post('/:id/answer', gameController.submitAnswer);

// Admin routes
router.post('/', authAdmin, gameController.createGame);
router.post('/:id/start', authAdmin, gameController.startGame);
router.post('/:id/end', authAdmin, gameController.endGame);

module.exports = router;
