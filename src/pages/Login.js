// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    adminCode: ''
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isAdminMode) {
        // Mode admin - vérifier le code admin
        if (formData.adminCode === 'BIRTHDAY_ADMIN_2025') {
          login('admin', 'Administrator');
          navigate('/admin');
        } else {
          setError('Code administrateur incorrect');
        }
      } else {
        // Mode utilisateur - vérifier si le nom existe dans la base
        const response = await fetch('/api/users');
        const result = await response.json();

        if (result.success && result.data) {
          const existingUser = result.data.find(
            user => user.name.toLowerCase() === formData.name.toLowerCase()
          );

          if (existingUser) {
            login('user', existingUser.name, existingUser.id);
            navigate('/');
          } else {
            setError('Nom d\'utilisateur non trouvé. Veuillez vous inscrire d\'abord.');
          }
        } else {
          setError('Erreur lors de la vérification. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎂 Birthday Battle Royale</h1>
          <p>Connectez-vous pour participer aux festivités</p>
        </div>

        <div className="login-mode-selector">
          <button
            type="button"
            className={`mode-btn ${!isAdminMode ? 'active' : ''}`}
            onClick={() => {
              setIsAdminMode(false);
              setFormData({ name: '', adminCode: '' });
              setError('');
            }}
          >
            👤 Participant
          </button>
          <button
            type="button"
            className={`mode-btn ${isAdminMode ? 'active' : ''}`}
            onClick={() => {
              setIsAdminMode(true);
              setFormData({ name: '', adminCode: '' });
              setError('');
            }}
          >
            🔐 Administrateur
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isAdminMode ? (
            <div className="form-group">
              <label htmlFor="name">Nom d'utilisateur</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Entrez votre nom"
                required
                disabled={loading}
                autoComplete="name"
              />
              <small className="form-hint">
                Utilisez le même nom que lors de votre inscription
              </small>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="adminCode">Code Administrateur</label>
              <input
                type="password"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleInputChange}
                placeholder="Code d'accès administrateur"
                required
                disabled={loading}
                autoComplete="current-password"
              />
              <small className="form-hint">
                Code requis pour accéder au panneau d'administration
              </small>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || (!formData.name && !isAdminMode) || (isAdminMode && !formData.adminCode)}
          >
            {loading ? (
              <span className="loading-spinner">⌛</span>
            ) : (
              <>
                {isAdminMode ? '🔐 Accès Admin' : '🎮 Se Connecter'}
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Pas encore inscrit ? {' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate('/register')}
              disabled={loading}
            >
              S'inscrire maintenant
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
