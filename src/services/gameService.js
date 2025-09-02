import api from './api';

export const gameService = {
  // Get active games
  async getActiveGames() {
    try {
      const response = await api.get('/games/active');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch games');
    }
  },

  // Get game by ID
  async getGameById(id) {
    try {
      const response = await api.get(`/games/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch game');
    }
  },

  // Join game
  async joinGame(gameId, userId) {
    try {
      const response = await api.post(`/games/${gameId}/join`, { userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to join game');
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
      const response = await api.get('/games/leaderboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  },

  // Admin: Create game
  async createGame(gameData, adminToken) {
    try {
      const response = await api.post('/games', gameData, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create game');
    }
  },

  // Admin: Start game
  async startGame(gameId, adminToken) {
    try {
      const response = await api.post(`/games/${gameId}/start`, {}, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to start game');
    }
  },

  // Admin: End game
  async endGame(gameId, adminToken) {
    try {
      const response = await api.post(`/games/${gameId}/end`, {}, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to end game');
    }
  }
};
