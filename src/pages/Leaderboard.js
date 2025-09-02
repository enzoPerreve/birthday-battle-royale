import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Balloons from '../components/Balloons';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';
import { gameService } from '../services/gameService';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeaderboard();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadLeaderboard = async () => {
    try {
      setError(null);
      const result = await gameService.getLeaderboard();
      
      if (result.success) {
        setLeaderboard(result.data || []);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setError(error.message);
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position) => {
    switch(position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  const getRankClass = (position) => {
    switch(position) {
      case 1: return 'rank-gold';
      case 2: return 'rank-silver';
      case 3: return 'rank-bronze';
      default: return 'rank-normal';
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    loadLeaderboard();
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navigation />
        <Loading message="Loading champions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navigation />
        <div className="container">
          <div className="error">
            <h3>⚠️ Error Loading Leaderboard</h3>
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
          <h1 className="title-secondary">🏆 LEADERBOARD</h1>
          <button onClick={handleRefresh} className="btn" title="Refresh leaderboard">
            🔄 REFRESH
          </button>
        </div>

        {leaderboard.length === 0 ? (
          <div className="success">
            <h3>🎮 No Champions Yet!</h3>
            <p>Be the first to play games and earn points!</p>
            <a href="/games" className="btn btn-large" style={{ marginTop: '20px' }}>
              PLAY GAMES
            </a>
          </div>
        ) : (
          <>
            <div className="leaderboard-stats" style={{ marginBottom: '40px' }}>
              <div className="stat-card">
                <span className="stat-number">{leaderboard.length}</span>
                <span className="stat-label">Total Players</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {Math.max(...leaderboard.map(p => p.points || 0))}
                </span>
                <span className="stat-label">Highest Score</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {leaderboard.reduce((sum, p) => sum + (p.gamesPlayed || 0), 0)}
                </span>
                <span className="stat-label">Games Played</span>
              </div>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((player, index) => (
                <div 
                  key={player.id} 
                  className={`leaderboard-item ${getRankClass(index + 1)} fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="rank-badge">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="player-avatar">
                    {player.photo ? (
                      <img src={player.photo} alt={player.name} />
                    ) : (
                      player.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  
                  <div className="player-info">
                    <div className="player-name">{player.name}</div>
                    <div className="player-phrase">"{player.phrase}"</div>
                  </div>
                  
                  <div className="player-stats">
                    <div className="stat">
                      <span className="stat-value">{player.points || 0}</span>
                      <span className="stat-label">Points</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{player.wins || 0}</span>
                      <span className="stat-label">Wins</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{player.gamesPlayed || 0}</span>
                      <span className="stat-label">Games</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ 
                fontFamily: 'var(--font-title)', 
                color: 'var(--color-yellow)', 
                fontSize: '14px' 
              }}>
                🎮 EARN POINTS BY PLAYING GAMES! 🎮
              </p>
              <a href="/games" className="btn btn-secondary" style={{ marginTop: '20px' }}>
                PLAY GAMES
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
