import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Prediction', path: '/prediction' },
    { name: 'Correlation', path: '/correlation' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <div className="w-64 min-h-screen bg-indigo-800 text-white p-6 fixed top-0 left-0 shadow-lg z-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Radiation App</h1>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 rounded-md text-lg transition-all ${
              pathname === item.path ? 'bg-white text-indigo-800 font-semibold' : 'hover:bg-indigo-700'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
