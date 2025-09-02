import React, { useState, useEffect, useCallback } from 'react';

const DebugAPI = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAPI = useCallback(async () => {
    setLoading(true);
    setResults([]);
    
    // Use relative URLs since API is on same domain
    const API_URL = window.location.origin;
    addResult(`🔍 API URL configurée: ${API_URL}`);

    // Test 1: Health check
    try {
      addResult('📡 Test Health Check...');
      const response = await fetch(`/api/health`);
      
      if (response.ok) {
        try {
          const data = await response.json();
          addResult(`✅ Health Check: ${response.status} - ${JSON.stringify(data)}`);
        } catch (jsonError) {
          const text = await response.text();
          addResult(`⚠️ Health Check: ${response.status} - Non-JSON response: ${text.substring(0, 100)}...`);
        }
      } else {
        const text = await response.text();
        addResult(`❌ Health Check: ${response.status} - ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      addResult(`❌ Health Check Error: ${error.message}`);
    }

    // Test 2: CORS preflight
    try {
      addResult('🌐 Test CORS...');
      const response = await fetch(`/api/users/register`, {
        method: 'OPTIONS'
      });
      addResult(`✅ CORS: ${response.status}`);
    } catch (error) {
      addResult(`❌ CORS Error: ${error.message}`);
    }

    // Test 3: POST Registration
    try {
      addResult('📝 Test POST Registration...');
      const response = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User Debug',
          contact: 'test-debug@example.com',
          phrase: 'Debug test run'
        })
      });
      
      if (response.ok) {
        try {
          const data = await response.json();
          addResult(`✅ POST: ${response.status} - ${JSON.stringify(data)}`);
        } catch (jsonError) {
          const text = await response.text();
          addResult(`⚠️ POST: ${response.status} - Non-JSON response: ${text.substring(0, 100)}...`);
        }
      } else {
        const text = await response.text();
        addResult(`❌ POST: ${response.status} - ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      addResult(`❌ POST Error: ${error.message}`);
    }

    // Test 4: Admin Token
    try {
      addResult('🔐 Test Admin Token...');
      const response = await fetch(`/api/admin/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: 'Agathe0211/'
        })
      });
      
      if (response.ok) {
        try {
          const data = await response.json();
          addResult(`✅ Admin: ${response.status} - ${JSON.stringify(data)}`);
        } catch (jsonError) {
          const text = await response.text();
          addResult(`⚠️ Admin: ${response.status} - Non-JSON response: ${text.substring(0, 100)}...`);
        }
      } else {
        const text = await response.text();
        addResult(`❌ Admin: ${response.status} - ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      addResult(`❌ Admin Error: ${error.message}`);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    testAPI();
  }, [testAPI]);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔧 DEBUG API CONNECTIVITY</h1>
      
      <button 
        onClick={testAPI} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      <div style={{ 
        marginTop: '20px', 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '5px',
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        <h3>📊 Test Results:</h3>
        {results.length === 0 ? (
          <p>No tests run yet...</p>
        ) : (
          results.map((result, index) => (
            <div key={index} style={{ 
              margin: '5px 0', 
              padding: '5px',
              backgroundColor: result.includes('❌') ? '#ffe6e6' : '#e6ffe6',
              borderRadius: '3px'
            }}>
              {result}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>🔗 Quick Links:</h3>
        <ul>
          <li><a href="/" target="_blank">🏠 Home</a></li>
          <li><a href="/register" target="_blank">📝 Register</a></li>
          <li><a href="/admin" target="_blank">🔧 Admin</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DebugAPI;
