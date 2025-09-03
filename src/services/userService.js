import api from './api';

export const userService = {
  // Register new user
  async register(userData, photoFile) {
    try {
      const response = await api.post('/register', {
        name: userData.name,
        contact: userData.contact,
        phrase: userData.phrase || 'Ready to rumble!'
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Get all participants - using health endpoint as workaround
  async getParticipants() {
    try {
      const response = await api.get('/health?participants=true');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch participants');
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users?userId=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Delete user (admin only)
  async deleteUser(id) {
    try {
      const response = await api.delete(`/users?userId=${id}`, {
        headers: {
          'X-Admin-Token': 'Agathe0211/'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  // Send notification to users (admin only)
  async sendNotification(message, recipients, subject) {
    try {
      const response = await api.post('/notifications', {
        type: 'admin_message',
        title: subject || 'Admin Notification',
        message,
        broadcast: recipients === 'all',
        userId: recipients !== 'all' ? recipients : null
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send notification');
    }
  }
};
