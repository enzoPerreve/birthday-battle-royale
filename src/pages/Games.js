import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Balloons from '../components/Balloons';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';
import { gameService } from '../services/gameService';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState(() => localStorage.getItem('userId') || null);

  useEffect(() => {
    loadGames();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadGames, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadGames = async () => {
    try {
      setError(null);
      const result = await gameService.getActiveGames();
      
      if (result.success) {
        setGames(result.data || []);
      }
    } catch (error) {
      console.error('Error loading games:', error);
      setError(error.message);
      toast.error('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const getGameIcon = (type) => {
    switch(type) {
      case 'quiz': return '🧠';
      case 'music': return '🎵';
      case 'lyrics': return '📝';
      default: return '🎮';
    }
  };

  const getGameStatus = (game) => {
    if (game.status === 'waiting') {
      return {
        text: 'WAITING FOR PLAYERS',
        class: 'status-waiting'
      };
    } else if (game.status === 'active') {
      return {
        text: 'GAME IN PROGRESS',
        class: 'status-active'
      };
    } else {
      return {
        text: 'COMPLETED',
        class: 'status-completed'
      };
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    loadGames();
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navigation />
        <Loading message="Loading games..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navigation />
        <div className="container">
          <div className="error">
            <h3>⚠️ Error Loading Games</h3>
            <p>{error}</p>
            <button onClick={handleRefresh} className="btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navigation />
      <Balloons />
      
      <div className="container fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 className="title-secondary">🎮 GAMES</h1>
          <button onClick={handleRefresh} className="btn" title="Refresh games">
            🔄 REFRESH
          </button>
        </div>

        {!userId && (
          <div className="warning" style={{ marginBottom: '30px' }}>
            <h3>📱 Register to Play!</h3>
            <p>You need to register first to join games and earn points.</p>
            <a href="/register" className="btn btn-large" style={{ marginTop: '15px' }}>
              REGISTER NOW
            </a>
          </div>
        )}

        {games.length === 0 ? (
          <div className="success">
            <h3>🎮 No Active Games</h3>
            <p>Games will appear here when they are created. Check back soon!</p>
            <div style={{ marginTop: '30px' }}>
              <a href="/leaderboard" className="btn btn-secondary">
                VIEW LEADERBOARD
              </a>
              <a href="/rules" className="btn" style={{ marginLeft: '15px' }}>
                VIEW RULES
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="games-stats" style={{ marginBottom: '40px' }}>
              <div className="stat-card">
                <span className="stat-number">{games.filter(g => g.status === 'waiting').length}</span>
                <span className="stat-label">Waiting</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{games.filter(g => g.status === 'active').length}</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {games.reduce((sum, g) => sum + g.participants.length, 0)}
                </span>
                <span className="stat-label">Total Players</span>
              </div>
            </div>

            <div className="games-grid">
              {games.map((game, index) => {
                const status = getGameStatus(game);
                return (
                  <div 
                    key={game.id} 
                    className={`game-card ${status.class} fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="game-header">
                      <div className="game-icon">
                        {getGameIcon(game.type)}
                      </div>
                      <div className="game-type">
                        {game.type.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="game-content">
                      <h3 className="game-title">{game.title}</h3>
                      <p className="game-description">{game.description}</p>
                      
                      <div className="game-info">
                        <div className="info-item">
                          <span className="info-label">Players:</span>
                          <span className="info-value">
                            {game.participants.length}/{game.maxParticipants}
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Time Limit:</span>
                          <span className="info-value">{game.timeLimit}s</span>
                        </div>
                      </div>
                      
                      <div className={`game-status ${status.class}`}>
                        {status.text}
                      </div>
                    </div>
                    
                    <div className="game-actions">
                      <div className="game-status-display">
                        {game.status === 'waiting' && (
                          <div className="game-waiting">
                            <span>⏳ Waiting for Admin</span>
                          </div>
                        )}
                        {game.status === 'active' && (
                          <div className="game-active">
                            <span>🔥 Game in Progress</span>
                          </div>
                        )}
                        {game.status === 'completed' && (
                          <div className="game-completed">
                            <span>✅ Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ 
                fontFamily: 'var(--font-title)', 
                color: 'var(--color-yellow)', 
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                🎯 GAME PARTICIPATION IS MANAGED BY ADMIN 🎯
              </p>
              <a href="/leaderboard" className="btn btn-secondary">
                VIEW LEADERBOARD
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Games;
