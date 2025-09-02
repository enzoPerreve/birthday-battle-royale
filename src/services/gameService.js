import api from './api';

export const gameService = {
  // Get active games
  async getActiveGames() {
    try {
      const response = await api.get('/games?status=active');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch games');
    }
  },

  // Get all games
  async getAllGames() {
    try {
      const response = await api.get('/games');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch games');
    }
  },

  // Get game by ID
  async getGameById(id) {
    try {
      const response = await api.get(`/games?gameId=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch game');
    }
  },

  // Join game
  async joinGame(gameId, userId) {
    try {
      const response = await api.post('/join-game', { gameId, userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to join game');
    }
  },

  // Leave game
  async leaveGame(gameId, userId) {
    try {
      const response = await api.delete('/join-game', { 
        data: { gameId, userId }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to leave game');
    }
  },

  // Submit answer
  async submitAnswer(gameId, userId, answer) {
    try {
      const response = await api.post(`/games/${gameId}/answer`, { userId, answer });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit answer');
    }
  },

  // Get leaderboard
  async getLeaderboard() {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  },

  // Get game stats
  async getGameStats(gameId) {
    try {
      const response = await api.get(`/stats?gameId=${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch game stats');
    }
  },

  // Admin: Create game
  async createGame(gameData, adminToken = 'Agathe0211/') {
    try {
      const response = await api.post('/games', gameData, {
        headers: {
          'X-Admin-Token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create game');
    }
  },

  // Admin: Start game
  async startGame(gameId, adminToken = 'Agathe0211/') {
    try {
      const response = await api.post('/game-control', {
        gameId,
        action: 'start'
      }, {
        headers: {
          'X-Admin-Token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to start game');
    }
  },

  // Admin: End game
  async endGame(gameId, adminToken = 'Agathe0211/') {
    try {
      const response = await api.post('/game-control', {
        gameId,
        action: 'end'
      }, {
        headers: {
          'X-Admin-Token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to end game');
    }
  },

  // Admin: Pause game
  async pauseGame(gameId, adminToken = 'Agathe0211/') {
    try {
      const response = await api.post('/game-control', {
        gameId,
        action: 'pause'
      }, {
        headers: {
          'X-Admin-Token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to pause game');
    }
  }
};
