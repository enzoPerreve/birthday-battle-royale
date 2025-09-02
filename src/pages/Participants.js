import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Balloons from '../components/Balloons';
import Navigation from '../components/Navigation';
import ParticipantCard from '../components/ParticipantCard';
import Loading from '../components/Loading';
import { userService } from '../services/userService';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadParticipants();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadParticipants, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadParticipants = async () => {
    try {
      setError(null);
      const result = await userService.getParticipants();
      
      if (result.success) {
        setParticipants(result.data || []);
      }
    } catch (error) {
      console.error('Error loading participants:', error);
      setError(error.message);
      toast.error('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    loadParticipants();
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navigation />
        <Loading message="Loading battle warriors..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navigation />
        <div className="container">
          <div className="error">
            <h3>⚠️ Error Loading Participants</h3>
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
          <h1 className="title-secondary">PARTICIPANTS</h1>
          <button onClick={handleRefresh} className="btn" title="Refresh participants">
            🔄 REFRESH
          </button>
        </div>

        {participants.length === 0 ? (
          <div className="success">
            <h3>🎮 No Warriors Yet!</h3>
            <p>Be the first to register and join the battle!</p>
            <a href="/register" className="btn btn-large" style={{ marginTop: '20px' }}>
              REGISTER NOW
            </a>
          </div>
        ) : (
          <>
            <div className="stats-container" style={{ marginBottom: '40px' }}>
              <div className="stat-card">
                <span className="stat-number">{participants.length}</span>
                <span className="stat-label">Total Warriors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {participants.filter(p => p.preferences?.alcohol).length}
                </span>
                <span className="stat-label">Alcohol Lovers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {participants.filter(p => p.preferences?.spicy).length}
                </span>
                <span className="stat-label">Spice Masters</span>
              </div>
            </div>

            <div className="grid-2x2">
              {participants.map((participant, index) => (
                <div 
                  key={participant.id} 
                  className={index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ParticipantCard participant={participant} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ 
                fontFamily: 'var(--font-title)', 
                color: 'var(--color-yellow)', 
                fontSize: '14px' 
              }}>
                🔥 READY FOR EPIC BATTLES! 🔥
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Participants;
