import React, { useState } from 'react';
import './DebugAPI.css';

const APITester = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const API_BASE = process.env.NODE_ENV === 'production' 
    ? 'https://birthday-battle-royale.vercel.app'
    : 'http://localhost:3000';

  const testEndpoint = async (name, url, options = {}) => {
    setLoading(prev => ({ ...prev, [name]: true }));
    
    try {
      const response = await fetch(`${API_BASE}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      const data = await response.json();
      
      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.status,
          success: response.ok,
          data: data,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [name]: {
          status: 'ERROR',
          success: false,
          data: { error: error.message },
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }));
    }
  };

  const tests = [
    // Tests existants
    {
      category: 'Basic API',
      tests: [
        {
          name: 'Health Check',
          action: () => testEndpoint('health', '/api/health')
        },
        {
          name: 'Register User',
          action: () => testEndpoint('register', '/api/register', {
            method: 'POST',
            body: JSON.stringify({
              name: 'Test User',
              contact: 'test@example.com',
              phrase: 'Ready to test!'
            })
          })
        },
        {
          name: 'Verify Admin',
          action: () => testEndpoint('verify', '/api/verify', {
            method: 'POST',
            body: JSON.stringify({ token: 'Agathe0211/' })
          })
        }
      ]
    },
    // Nouveaux tests
    {
      category: 'Game Management',
      tests: [
        {
          name: 'Get All Games',
          action: () => testEndpoint('games_all', '/api/games')
        },
        {
          name: 'Get Active Games',
          action: () => testEndpoint('games_active', '/api/games?status=active')
        },
        {
          name: 'Create New Game',
          action: () => testEndpoint('create_game', '/api/games', {
            method: 'POST',
            body: JSON.stringify({
              name: 'Test Battle Royale',
              maxParticipants: 8
            })
          })
        },
        {
          name: 'Start Game (Admin)',
          action: () => testEndpoint('start_game', '/api/game-control', {
            method: 'POST',
            headers: { 'X-Admin-Token': 'Agathe0211/' },
            body: JSON.stringify({
              gameId: 'game_1',
              action: 'start'
            })
          })
        }
      ]
    },
    {
      category: 'User Management',
      tests: [
        {
          name: 'Get All Users',
          action: () => testEndpoint('users_all', '/api/users')
        },
        {
          name: 'Get Active Users',
          action: () => testEndpoint('users_active', '/api/users?status=active')
        },
        {
          name: 'Search Users',
          action: () => testEndpoint('users_search', '/api/users?search=alice')
        },
        {
          name: 'Join Game',
          action: () => testEndpoint('join_game', '/api/join-game', {
            method: 'POST',
            body: JSON.stringify({
              gameId: 'game_1',
              userId: 'user_test'
            })
          })
        }
      ]
    },
    {
      category: 'Battle System',
      tests: [
        {
          name: 'Execute Battle',
          action: () => testEndpoint('battle_execute', '/api/battle', {
            method: 'POST',
            body: JSON.stringify({
              gameId: 'game_1',
              round: 1
            })
          })
        },
        {
          name: 'Get Battle History',
          action: () => testEndpoint('battle_history', '/api/battle?gameId=game_1')
        }
      ]
    },
    {
      category: 'Statistics & Notifications',
      tests: [
        {
          name: 'Global Stats',
          action: () => testEndpoint('stats_global', '/api/stats')
        },
        {
          name: 'Game Stats',
          action: () => testEndpoint('stats_game', '/api/stats?gameId=game_1')
        },
        {
          name: 'User Stats',
          action: () => testEndpoint('stats_user', '/api/stats?userId=user_1')
        },
        {
          name: 'Get Notifications',
          action: () => testEndpoint('notifications', '/api/notifications?userId=user_1')
        },
        {
          name: 'Create Notification',
          action: () => testEndpoint('create_notification', '/api/notifications', {
            method: 'POST',
            body: JSON.stringify({
              type: 'test',
              title: 'Test Notification',
              message: 'This is a test notification',
              userId: 'user_test'
            })
          })
        }
      ]
    }
  ];

  const runAllTests = async () => {
    for (const category of tests) {
      for (const test of category.tests) {
        await test.action();
        await new Promise(resolve => setTimeout(resolve, 500)); // Délai entre les tests
      }
    }
  };

  const formatResult = (result) => {
    if (!result) return null;
    
    return (
      <div className={`result ${result.success ? 'success' : 'error'}`}>
        <div className="result-header">
          <span className="status">Status: {result.status}</span>
          <span className="timestamp">{result.timestamp}</span>
        </div>
        <pre className="result-data">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="api-tester">
      <div className="header">
        <h1>🔧 Complete API Tester</h1>
        <p>Test all Birthday Battle Royale API endpoints</p>
        <button 
          onClick={runAllTests}
          className="run-all-btn"
          disabled={Object.values(loading).some(l => l)}
        >
          🚀 Run All Tests
        </button>
      </div>

      {tests.map((category, categoryIndex) => (
        <div key={categoryIndex} className="test-category">
          <h2>📁 {category.category}</h2>
          <div className="test-grid">
            {category.tests.map((test, testIndex) => (
              <div key={testIndex} className="test-item">
                <div className="test-header">
                  <h3>{test.name}</h3>
                  <button
                    onClick={test.action}
                    disabled={loading[test.name.toLowerCase().replace(/\s/g, '_')]}
                    className="test-btn"
                  >
                    {loading[test.name.toLowerCase().replace(/\s/g, '_')] ? '⏳' : '▶️'} Test
                  </button>
                </div>
                {formatResult(results[test.name.toLowerCase().replace(/\s/g, '_')])}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="api-summary">
        <h2>📊 API Summary</h2>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">{Object.keys(results).length}</span>
            <span className="stat-label">Tests Run</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {Object.values(results).filter(r => r.success).length}
            </span>
            <span className="stat-label">Successful</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {Object.values(results).filter(r => !r.success).length}
            </span>
            <span className="stat-label">Failed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITester;
