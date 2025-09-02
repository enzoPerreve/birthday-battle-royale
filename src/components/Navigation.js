import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/register', label: 'Register' },
    { path: '/participants', label: 'Players' },
    { path: '/games', label: 'Games' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/admin', label: 'Admin' }
  ];

  return (
    <nav className="nav-links">
      {navItems.map((item) => (
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
