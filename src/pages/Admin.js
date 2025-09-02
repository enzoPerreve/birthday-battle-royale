import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';
import { userService } from '../services/userService';
import { battleService } from '../services/battleService';
import { gameService } from '../services/gameService';

const Admin = () => {
  const [participants, setParticipants] = useState([]);
  const [battles, setBattles] = useState([]);
  const [activeBattle, setActiveBattle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGame, setSelectedGame] = useState('quiz');
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  // Plus de useEffect qui teste automatiquement le token

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [participantsResult, battlesResult, activeBattlesResult] = await Promise.all([
        userService.getParticipants(),
        battleService.getAllBattles(),
        battleService.getActiveBattles()
      ]);

      if (participantsResult.success) {
        setParticipants(participantsResult.data || []);
      }

      if (battlesResult.success) {
        setBattles(battlesResult.data || []);
      }

      if (activeBattlesResult.success && activeBattlesResult.data.length > 0) {
        setActiveBattle(activeBattlesResult.data[0]);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!adminToken.trim()) {
      toast.error('Please enter admin token');
      return;
    }
    
    try {
      // Définir temporairement le token pour la validation
      localStorage.setItem('adminToken', adminToken);
      
      // Test simple : essayer de récupérer les battles (pas besoin d'admin)
      // puis tester une route admin
      const response = await fetch(`${process.env.REACT_APP_API_URL}/battles/test-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken
        },
        body: JSON.stringify({ test: true })
      });
      
      if (response.ok) {
        // Token valide
        setIsAuthenticated(true);
        loadAdminData();
        toast.success('Admin login successful!');
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Token invalide - nettoyer
      localStorage.removeItem('adminToken');
      setAdminToken('');
      setIsAuthenticated(false);
      toast.error('Invalid admin token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken('');
    setIsAuthenticated(false);
    setParticipants([]);
    setBattles([]);
    setActiveBattle(null);
  };

  const generateRandomBattle = async (type = '1v1') => {
    try {
      const result = await battleService.generateRandomBattle(type);
      if (result.success) {
        toast.success(`Random ${type} battle created!`);
        loadAdminData(); // Refresh data
      }
    } catch (error) {
      console.error('Error generating battle:', error);
      toast.error(error.message || 'Failed to generate battle');
    }
  };

  const createGame = async () => {
    if (!gameTitle.trim()) {
      toast.error('Veuillez entrer un titre pour le jeu');
      return;
    }

    try {
      const gameData = {
        type: selectedGame,
        title: gameTitle,
        description: gameDescription || getDefaultDescription(selectedGame),
        maxParticipants: 10,
        timeLimit: selectedGame === 'quiz' ? 30 : selectedGame === 'music' ? 45 : 60,
        status: 'waiting'
      };

      const adminTokenValue = localStorage.getItem('adminToken');
      const result = await gameService.createGame(gameData, adminTokenValue);
      
      if (result.success) {
        toast.success(`Jeu "${gameTitle}" créé avec succès !`);
        setGameTitle('');
        setGameDescription('');
        loadAdminData(); // Refresh data
      }
    } catch (error) {
      console.error('Error creating game:', error);
      toast.error(error.message || 'Échec de la création du jeu');
    }
  };

  const getDefaultDescription = (gameType) => {
    switch(gameType) {
      case 'quiz': return 'Quiz sur Enzo et culture générale';
      case 'music': return 'Devinez les chansons et artistes';
      case 'lyrics': return 'Complétez les paroles des chansons';
      default: return 'Jeu amusant pour la fête !';
    }
  };

  const getGameTypeLabel = (gameType) => {
    switch(gameType) {
      case 'quiz': return '🧠 Quiz';
      case 'music': return '🎵 Musique';
      case 'lyrics': return '📝 Paroles';
      default: return '🎮 Jeu';
    }
  };

  const updateBattleStatus = async (battleId, status) => {
    try {
      const result = await battleService.updateBattleStatus(battleId, status);
      if (result.success) {
        toast.success(`Battle ${status}!`);
        loadAdminData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating battle:', error);
      toast.error(error.message || 'Failed to update battle');
    }
  };

  const sendNotificationToAll = async () => {
    try {
      const contacts = participants.map(p => p.contact).filter(contact => contact);
      if (contacts.length === 0) {
        toast.error('No participants with contact information');
        return;
      }

      const result = await userService.sendNotification(
        '🎮 Battle Royale Update! New battles are starting soon. Get ready to rumble! 🔥',
        contacts,
        'Birthday Battle Royale - Battle Alert!'
      );

      if (result.success) {
        toast.success(`Notification sent to ${result.sent} participants!`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error(error.message || 'Failed to send notification');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <Navigation />
        <div className="container">
          <h1 className="title-secondary">ADMIN LOGIN</h1>
          
          <div style={{ background: '#1A2A4F', border: '2px solid #FFD700', borderRadius: '10px', padding: '20px', marginBottom: '30px', maxWidth: '400px' }}>
            <p style={{ color: '#FFD700', margin: '0', textAlign: 'center' }}>
              💡 <strong>Token Admin:</strong> Agathe0211/
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="form-container" style={{ maxWidth: '400px' }}>
            <div className="form-group">
              <label htmlFor="adminToken" className="form-label">Admin Token</label>
              <input
                type="password"
                id="adminToken"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="form-input"
                placeholder="Agathe0211/"
                required
              />
            </div>
            <button type="submit" className="btn btn-large" style={{ width: '100%' }}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <Navigation />
        <Loading message="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navigation />
      
      <div className="container fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 className="title-secondary">ADMIN DASHBOARD</h1>
          <button onClick={handleLogout} className="btn">
            LOGOUT
          </button>
        </div>

        {/* Stats Overview */}
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">{participants.length}</span>
            <span className="stat-label">Total Participants</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{battles.length}</span>
            <span className="stat-label">Total Battles</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {battles.filter(b => b.status === 'active').length}
            </span>
            <span className="stat-label">Active Battles</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {battles.filter(b => b.status === 'completed').length}
            </span>
            <span className="stat-label">Completed Battles</span>
          </div>
        </div>

        <div className="admin-panel">
          {/* Game Creation */}
          <div className="admin-section">
            <h3>🎮 Créer un Jeu</h3>
            
            <div className="game-creation-form">
              <div className="form-group">
                <label className="form-label">Type de Jeu</label>
                <select 
                  value={selectedGame} 
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="form-input"
                >
                  <option value="quiz">🧠 Quiz sur Enzo</option>
                  <option value="music">🎵 Devine la Musique</option>
                  <option value="lyrics">📝 Complète les Paroles</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Titre du Jeu</label>
                <input
                  type="text"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  className="form-input"
                  placeholder="Ex: Quiz sur les goûts d'Enzo"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (optionnel)</label>
                <textarea
                  value={gameDescription}
                  onChange={(e) => setGameDescription(e.target.value)}
                  className="form-input"
                  placeholder="Description personnalisée du jeu..."
                  rows="3"
                />
              </div>

              <div className="game-preview">
                <h4>Aperçu du Jeu:</h4>
                <div className="preview-card">
                  <div className="preview-icon">
                    {selectedGame === 'quiz' ? '🧠' : selectedGame === 'music' ? '🎵' : '📝'}
                  </div>
                  <div className="preview-content">
                    <h5>{gameTitle || `${getGameTypeLabel(selectedGame)} - Titre à définir`}</h5>
                    <p>{gameDescription || getDefaultDescription(selectedGame)}</p>
                    <div className="preview-details">
                      <span>👥 Max 10 joueurs</span>
                      <span>⏰ {selectedGame === 'quiz' ? '30' : selectedGame === 'music' ? '45' : '60'}s par question</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={createGame}
                className="btn btn-accent btn-large"
                disabled={!gameTitle.trim()}
              >
                CRÉER LE JEU
              </button>
            </div>
          </div>

          {/* Battle Management */}
          <div className="admin-section">
            <h3>⚔️ Gestion des Battles</h3>
            <div className="admin-controls">
              <button 
                onClick={() => generateRandomBattle('1v1')} 
                className="btn"
              >
                Generate 1v1
              </button>
              <button 
                onClick={() => generateRandomBattle('2v2')} 
                className="btn"
              >
                Generate 2v2
              </button>
              <button 
                onClick={() => generateRandomBattle('3v3')} 
                className="btn"
              >
                Generate 3v3
              </button>
              <button 
                onClick={() => generateRandomBattle('free-for-all')} 
                className="btn btn-secondary"
              >
                Free-for-All
              </button>
            </div>

            {activeBattle && (
              <div className="battle-display">
                <div className="battle-type">{activeBattle.type.toUpperCase()} BATTLE</div>
                <div className="battle-participants">
                  {activeBattle.participantDetails?.map((participant, index) => (
                    <React.Fragment key={participant.id}>
                      <div className="battle-participant">
                        <div className="battle-participant-image">
                          {participant.photo ? (
                            <img src={participant.photo} alt={participant.name} />
                          ) : (
                            participant.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="battle-participant-name">{participant.name}</div>
                      </div>
                      {index < activeBattle.participantDetails.length - 1 && (
                        <div className="battle-vs">VS</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="admin-controls">
                  <button 
                    onClick={() => updateBattleStatus(activeBattle.id, 'active')}
                    className="btn"
                    disabled={activeBattle.status === 'active'}
                  >
                    Start Battle
                  </button>
                  <button 
                    onClick={() => updateBattleStatus(activeBattle.id, 'completed')}
                    className="btn btn-secondary"
                    disabled={activeBattle.status === 'completed'}
                  >
                    End Battle
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Management */}
          <div className="admin-section">
            <h3>📢 Notifications</h3>
            <div className="admin-controls">
              <button onClick={sendNotificationToAll} className="btn">
                Notify All Participants
              </button>
              <button onClick={loadAdminData} className="btn btn-secondary">
                Refresh Data
              </button>
            </div>
          </div>

          {/* Participants Table */}
          <div className="admin-section">
            <h3>👥 Participants</h3>
            {participants.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Phrase</th>
                    <th>Preferences</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => (
                    <tr key={participant.id}>
                      <td>
                        {participant.photo ? (
                          <img src={participant.photo} alt={participant.name} />
                        ) : (
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            backgroundColor: 'var(--color-yellow)',
                            color: 'var(--color-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}>
                            {participant.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td>{participant.name}</td>
                      <td>{participant.contact}</td>
                      <td style={{ fontStyle: 'italic' }}>"{participant.phrase}"</td>
                      <td>
                        {participant.preferences?.alcohol && '🍷 '}
                        {participant.preferences?.spicy && '🌶️'}
                      </td>
                      <td>
                        <span style={{ 
                          color: participant.isActive ? 'var(--color-yellow)' : 'var(--color-red)' 
                        }}>
                          {participant.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--color-text)' }}>
                No participants registered yet.
              </p>
            )}
          </div>

          {/* Battles History */}
          <div className="admin-section">
            <h3>⚔️ Battles History</h3>
            {battles.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {battles.slice(0, 10).map(battle => (
                    <tr key={battle.id}>
                      <td>{battle.type.toUpperCase()}</td>
                      <td>{battle.participants?.length || 0} players</td>
                      <td>
                        <span style={{ 
                          color: battle.status === 'completed' ? 'var(--color-yellow)' : 
                                 battle.status === 'active' ? 'var(--color-red)' : 'var(--color-text)'
                        }}>
                          {battle.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        {battle.createdAt ? new Date(battle.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
                      </td>
                      <td>
                        {battle.status === 'pending' && (
                          <button 
                            onClick={() => updateBattleStatus(battle.id, 'active')}
                            className="btn"
                            style={{ fontSize: '10px', padding: '5px 10px' }}
                          >
                            START
                          </button>
                        )}
                        {battle.status === 'active' && (
                          <button 
                            onClick={() => updateBattleStatus(battle.id, 'completed')}
                            className="btn btn-secondary"
                            style={{ fontSize: '10px', padding: '5px 10px' }}
                          >
                            END
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--color-text)' }}>
                No battles created yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-creation-form {
          background: rgba(26, 35, 126, 0.3);
          border: 2px solid var(--color-gold);
          border-radius: 15px;
          padding: 25px;
          backdrop-filter: blur(10px);
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          color: var(--color-gold);
          font-family: var(--font-title);
          font-size: 1rem;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid var(--color-gold);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-yellow);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        textarea.form-input {
          resize: vertical;
          min-height: 80px;
        }

        .game-preview {
          margin: 20px 0;
          padding: 20px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid var(--color-gold);
          border-radius: 10px;
        }

        .game-preview h4 {
          color: var(--color-gold);
          font-family: var(--font-title);
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .preview-card {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(26, 35, 126, 0.4);
          padding: 15px;
          border-radius: 10px;
        }

        .preview-icon {
          font-size: 2.5rem;
          min-width: 60px;
          text-align: center;
        }

        .preview-content {
          flex: 1;
        }

        .preview-content h5 {
          color: var(--color-gold);
          font-family: var(--font-title);
          margin: 0 0 8px 0;
          font-size: 1.1rem;
        }

        .preview-content p {
          color: white;
          margin: 0 0 10px 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .preview-details {
          display: flex;
          gap: 15px;
          font-size: 0.8rem;
          color: var(--color-yellow);
        }

        .btn-accent {
          background: linear-gradient(135deg, var(--color-gold), var(--color-yellow));
          color: var(--color-dark);
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-family: var(--font-title);
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-accent:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        }

        .btn-accent:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-large {
          padding: 15px 30px;
          font-size: 1.1rem;
          min-width: 200px;
        }

        @media (max-width: 768px) {
          .game-creation-form {
            padding: 20px 15px;
          }

          .preview-card {
            flex-direction: column;
            text-align: center;
          }

          .preview-icon {
            min-width: auto;
          }

          .preview-details {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
