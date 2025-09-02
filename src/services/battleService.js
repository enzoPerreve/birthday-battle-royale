import api from './api';

export const battleService = {
  // Get battle history for a game
  async getBattleHistory(gameId) {
    try {
      const response = await api.get(`/battle?gameId=${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch battle history');
    }
  },

  // Execute battle round
  async executeBattle(gameId, round) {
    try {
      const response = await api.post('/battle', { gameId, round });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to execute battle');
    }
  },

  // Get battle stats
  async getBattleStats(gameId) {
    try {
      const response = await api.get(`/stats?gameId=${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch battle stats');
    }
  },

  // Get notifications
  async getNotifications(userId) {
    try {
      const response = await api.get(`/notifications?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  },

  // Send battle notification (admin only)
  async sendBattleNotification(message, recipients, subject) {
    try {
      const response = await api.post('/notifications', {
        type: 'battle',
        title: subject || 'Battle Notification',
        message,
        broadcast: recipients === 'all',
        userId: recipients !== 'all' ? recipients : null
      }, {
        headers: {
          'X-Admin-Token': 'Agathe0211/'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send battle notification');
    }
  }
};
