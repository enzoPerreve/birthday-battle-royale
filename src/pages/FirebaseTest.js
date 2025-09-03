// src/pages/FirebaseTest.js - Page de test pour vérifier Firebase
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Navigation from '../components/Navigation';

const FirebaseTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState({
    name: 'Test User',
    contact: 'test@example.com',
    phrase: 'Testing Firebase!'
  });

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    try {
      const result = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: true, data: result, error: null }
      }));
      toast.success(`✅ ${testName} réussi !`);
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: false, data: null, error: error.message }
      }));
      toast.error(`❌ ${testName} échoué: ${error.message}`);
    }
    setLoading(false);
  };

  const testFirebaseRegister = async () => {
    const response = await fetch('/api/register-firebase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...testData,
        name: testData.name + ' (Firebase Test)'
      })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const testRegisterAPI = async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const testUsersAPI = async () => {
    const response = await fetch('/api/users');
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const testGamesAPI = async () => {
    const response = await fetch('/api/games');
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const testBattleAPI = async () => {
    const response = await fetch('/api/battle');
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const runAllTests = async () => {
    setTestResults({});
    await runTest('Firebase Register (Direct)', testFirebaseRegister);
    await runTest('Register API (Current)', testRegisterAPI);
    await runTest('Users API', testUsersAPI);
    await runTest('Games API', testGamesAPI);
    await runTest('Battle API', testBattleAPI);
  };

  const getStatusIcon = (testName) => {
    if (!(testName in testResults)) return '⏳';
    return testResults[testName].success ? '✅' : '❌';
  };

  const getStatusColor = (testName) => {
    if (!(testName in testResults)) return '#ffd700';
    return testResults[testName].success ? '#00ff00' : '#ff0000';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navigation />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 20px' }}>
        <div style={{ 
          background: 'var(--color-secondary-bg)', 
          border: '3px solid var(--color-yellow)',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '20px'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: 'var(--color-yellow)',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            🧪 Test Firebase & APIs
          </h1>

          <p style={{ textAlign: 'center', marginBottom: '30px' }}>
            Vérifie que Firebase Firestore est correctement activé et que toutes les APIs fonctionnent
          </p>

          {/* Données de test */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: 'var(--color-yellow)', marginBottom: '15px' }}>📝 Données de test :</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <input
                type="text"
                value={testData.name}
                onChange={(e) => setTestData(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  padding: '10px',
                  background: 'var(--color-bg)',
                  border: '2px solid var(--color-yellow)',
                  borderRadius: '4px',
                  color: 'var(--color-text)'
                }}
                placeholder="Nom de test"
              />
              <input
                type="email"
                value={testData.contact}
                onChange={(e) => setTestData(prev => ({ ...prev, contact: e.target.value }))}
                style={{
                  padding: '10px',
                  background: 'var(--color-bg)',
                  border: '2px solid var(--color-yellow)',
                  borderRadius: '4px',
                  color: 'var(--color-text)'
                }}
                placeholder="Email de test"
              />
              <input
                type="text"
                value={testData.phrase}
                onChange={(e) => setTestData(prev => ({ ...prev, phrase: e.target.value }))}
                style={{
                  padding: '10px',
                  background: 'var(--color-bg)',
                  border: '2px solid var(--color-yellow)',
                  borderRadius: '4px',
                  color: 'var(--color-text)'
                }}
                placeholder="Phrase de test"
              />
            </div>
          </div>

          {/* Bouton de test global */}
          <button
            onClick={runAllTests}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: 'var(--color-button)',
              color: 'var(--color-text)',
              border: '2px solid var(--color-yellow)',
              borderRadius: '8px',
              fontFamily: 'var(--font-title)',
              fontSize: '12px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '30px'
            }}
          >
            {loading ? '🔄 Test en cours...' : '🚀 Tester toutes les APIs'}
          </button>

          {/* Résultats des tests */}
          <div style={{ display: 'grid', gap: '15px' }}>
            {['Firebase Register (Direct)', 'Register API (Current)', 'Users API', 'Games API', 'Battle API'].map(testName => (
              <div key={testName} style={{
                background: 'var(--color-bg)',
                border: `2px solid ${getStatusColor(testName)}`,
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{getStatusIcon(testName)}</span>
                  <h4 style={{ margin: 0, color: 'var(--color-yellow)' }}>{testName}</h4>
                </div>
                
                {testResults[testName] && (
                  <div style={{ fontSize: '12px' }}>
                    {testResults[testName].success ? (
                      <div style={{ color: '#00ff00' }}>
                        ✅ Succès ! 
                        {testResults[testName].data.note && (
                          <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                            📝 {testResults[testName].data.note}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ color: '#ff0000' }}>
                        ❌ Erreur: {testResults[testName].error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid var(--color-yellow)',
            borderRadius: '8px',
            fontSize: '12px'
          }}>
            <h4 style={{ color: 'var(--color-yellow)', marginBottom: '10px' }}>📋 Instructions :</h4>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>✅ = API fonctionne parfaitement</li>
              <li>❌ = Problème détecté</li>
              <li>⏳ = Test pas encore lancé</li>
              <li>Si tu vois "mode temporaire" = Firebase pas encore connecté</li>
              <li>Si tu vois "Firebase" dans les réponses = Firebase fonctionne !</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;
