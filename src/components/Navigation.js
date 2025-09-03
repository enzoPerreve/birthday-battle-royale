import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importer le hook d'authentification

const Navigation = () => {
  const location = useLocation();
  const { isAdmin } = useAuth(); // Récupérer l'état admin

  const navItems = [
    { path: '/', label: 'Home', public: true },
    { path: '/register', label: 'Register', public: true },
    { path: '/participants', label: 'Players', public: true },
    { path: '/games', label: 'Games', public: false }, // Non public
    { path: '/leaderboard', label: 'Leaderboard', public: true },
    { path: '/admin', label: 'Admin', public: true }
  ];

  const filteredNavItems = navItems.filter(item => item.public || isAdmin);

  return (
    <nav className="nav-links">
      {filteredNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
