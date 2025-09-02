import api from './api';

export const userService = {
  // Register new user
  async register(userData, photoFile) {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('contact', userData.contact);
      formData.append('phrase', userData.phrase || 'Ready to rumble!');
      
      // Handle preferences
      if (userData.preferences) {
        formData.append('preferences', JSON.stringify(userData.preferences));
      }
      
      // Handle photo upload
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await api.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Get all participants
  async getParticipants() {
    try {
      const response = await api.get('/users/participants');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch participants');
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Update user (admin only)
  async updateUser(id, userData, photoFile) {
    try {
      const formData = new FormData();
      
      if (userData.name) formData.append('name', userData.name);
      if (userData.contact) formData.append('contact', userData.contact);
      if (userData.phrase) formData.append('phrase', userData.phrase);
      if (userData.preferences) {
        formData.append('preferences', JSON.stringify(userData.preferences));
      }
      if (userData.isActive !== undefined) {
        formData.append('isActive', userData.isActive);
      }
      
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await api.put(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  // Delete user (admin only)
  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  // Send notification to users (admin only)
  async sendNotification(message, recipients, subject) {
    try {
      const response = await api.post('/users/notify', {
        message,
        recipients,
        subject
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send notification');
    }
  }
};
