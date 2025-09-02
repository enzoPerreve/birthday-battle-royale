import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for admin token
api.interceptors.request.use((config) => {
  // Ne pas envoyer automatiquement le token depuis localStorage
  // Le token sera ajouté manuellement quand nécessaire
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Redirect to login if needed
    }
    
    return Promise.reject(error);
  }
);

export default api;
