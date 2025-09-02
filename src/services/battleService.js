import api from './api';

export const battleService = {
  // Get all battles
  async getAllBattles() {
    try {
      const response = await api.get('/battles');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch battles');
    }
  },

  // Get active battles
  async getActiveBattles() {
    try {
      const response = await api.get('/battles/active');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch active battles');
    }
  },

  // Get battle by ID
  async getBattleById(id) {
    try {
      const response = await api.get(`/battles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch battle');
    }
  },

  // Create new battle (admin only)
  async createBattle(battleData) {
    try {
      const response = await api.post('/battles', battleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create battle');
    }
  },

  // Generate random battle (admin only)
  async generateRandomBattle(type = '1v1') {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await api.post('/battles/random', { type }, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate random battle');
    }
  },

  // Update battle status (admin only)
  async updateBattleStatus(id, status) {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await api.put(`/battles/${id}/status`, { status }, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update battle status');
    }
  },

  // Set battle winner (admin only)
  async setBattleWinner(id, winnerId) {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await api.put(`/battles/${id}/winner`, { winnerId }, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to set battle winner');
    }
  },

  // Send battle notification (admin only)
  async sendBattleNotification(message, recipients, subject) {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await api.post('/battles/notify', {
        message,
        recipients,
        subject
      }, {
        headers: {
          'x-admin-token': adminToken
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send battle notification');
    }
  }
};
