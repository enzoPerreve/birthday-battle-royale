import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/Register';
import Participants from './pages/Participants';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/games" element={<Games />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
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
  );
}

export default App;
