import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Importer le fournisseur et hook
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Participants from './pages/Participants';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import DebugAPI from './pages/DebugAPI';
import APITester from './pages/APITester';
import './styles/App.css';

// Composant pour protéger les routes qui nécessitent une authentification
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Composant pour rediriger les utilisateurs connectés loin de login/register
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider> {/* Envelopper l'application avec le fournisseur */}
      <div className="App">
        <Router>
          <Routes>
            {/* Routes publiques - accessibles seulement si non connecté */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Routes protégées - nécessitent une authentification */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/participants" element={
              <ProtectedRoute>
                <Participants />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            {/* Routes admin uniquement */}
            <Route path="/games" element={
              <ProtectedRoute adminOnly={true}>
                <Games />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/debug" element={
              <ProtectedRoute adminOnly={true}>
                <DebugAPI />
              </ProtectedRoute>
            } />
            <Route path="/api-test" element={
              <ProtectedRoute adminOnly={true}>
                <APITester />
              </ProtectedRoute>
            } />
            
            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A2A4F',
              color: '#F2F2F2',
              border: '2px solid #FFD700',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600'
            },
            success: {
              iconTheme: {
                primary: '#FFD700',
                secondary: '#1A2A4F',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF2D2D',
                secondary: '#1A2A4F',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
