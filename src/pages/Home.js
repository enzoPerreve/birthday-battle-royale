import React from 'react';
import { Link } from 'react-router-dom';
import Balloons from '../components/Balloons';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div className="page-container">
      <Navigation />
      <Balloons />
      
      <div className="container fade-in">
        <h1 className="title-main">
          BIRTHDAY BATTLE<br />ROYALE
        </h1>
        
        <p className="subtitle">
          SCAN QR CODE TO REGISTER
        </p>
        
        {/* Rules Section */}
        <div className="home-rules">
          <h2>📜 RÈGLES DU JEU</h2>
          
          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">🎯</div>
              <h3>Comment Jouer</h3>
              <ul>
                <li>Inscrivez-vous avec votre nom et contact</li>
                <li>L'admin lance les jeux</li>
                <li>Participez pour gagner des points</li>
                <li>Grimpez au classement !</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🎮</div>
              <h3>Types de Jeux</h3>
              <ul>
                <li><strong>🧠 Quiz:</strong> Questions sur Enzo</li>
                <li><strong>🎵 Musique:</strong> Devinez les chansons</li>
                <li><strong>📝 Mots:</strong> Jeux créatifs</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">⭐</div>
              <h3>Points</h3>
              <ul>
                <li>Bonne réponse: +10 points</li>
                <li>Premier à répondre: +5 bonus</li>
                <li>Fin de jeu: +20 points</li>
                <li>Créativité: Bonus admin !</li>
              </ul>
            </div>
          </div>

          <div className="birthday-rule">
            <h3>🎂 Règle Spéciale Anniversaire 🎂</h3>
            <p>
              La règle la plus importante : Célébrez l'anniversaire d'Enzo avec joie, 
              rires et un peu de compétition amicale !
            </p>
          </div>
        </div>
        
        <div className="home-actions">
          <Link to="/participants" className="btn btn-accent btn-large pulse">
            VOIR LES PARTICIPANTS
          </Link>
        </div>
        
        <div className="home-info">
          <p style={{ 
            marginTop: '40px', 
            fontSize: '14px', 
            color: 'var(--color-yellow)',
            fontFamily: 'var(--font-title)'
          }}>
            🎮 BATAILLES ÉPIQUES TOUTES LES 20 MINUTES 🎮
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .home-rules {
          margin: 40px 0;
          text-align: left;
        }

        .home-rules h2 {
          font-family: var(--font-title);
          color: var(--color-gold);
          font-size: 2rem;
          text-align: center;
          margin-bottom: 30px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .rule-card {
          background: rgba(26, 35, 126, 0.3);
          border: 2px solid var(--color-gold);
          border-radius: 15px;
          padding: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .rule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }

        .rule-icon {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 15px;
        }

        .rule-card h3 {
          font-family: var(--font-title);
          color: var(--color-gold);
          font-size: 1.3rem;
          margin-bottom: 15px;
          text-align: center;
        }

        .rule-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .rule-card li {
          color: white;
          font-size: 0.95rem;
          margin-bottom: 8px;
          padding-left: 15px;
          position: relative;
          line-height: 1.4;
        }

        .rule-card li:before {
          content: "⚡";
          position: absolute;
          left: 0;
          color: var(--color-yellow);
        }

        .birthday-rule {
          background: linear-gradient(135deg, var(--color-pink), var(--color-purple));
          border-radius: 15px;
          padding: 20px;
          border: 2px solid var(--color-gold);
          text-align: center;
        }

        .birthday-rule h3 {
          font-family: var(--font-title);
          color: white;
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .birthday-rule p {
          color: white;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
        }

        .home-actions {
          margin: 40px 0;
        }

        .btn {
          padding: 15px 30px;
          border: none;
          border-radius: 25px;
          font-family: var(--font-title);
          font-size: 1.1rem;
          font-weight: bold;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          min-width: 200px;
        }

        .btn-accent {
          background: linear-gradient(135deg, var(--color-gold), var(--color-yellow));
          color: var(--color-dark);
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .rules-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .rule-card {
            padding: 15px;
          }

          .home-rules h2 {
            font-size: 1.5rem;
          }

          .rule-card h3 {
            font-size: 1.1rem;
          }

          .rule-card li {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
