// src/components/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import WeatherWidget from "./WeatherWidget";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Prediction', path: '/predict' },
    { name: 'Correlation', path: '/correlation' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 flex items-center justify-center">
              <img 
                src="/imd_logo.webp" 
                alt="IMD Logo" 
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-white text-sm md:text-base font-bold tracking-tight">
                India Meteorological Department
              </h1>
              <p className="text-gray-400 text-xs">
                Ministry of Earth Sciences, Government of India
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <nav className="flex items-center backdrop-blur-xl bg-black/20 border border-gray-700/40 rounded-full px-2 py-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-900/30 text-cyan-300 backdrop-blur-xl'
                        : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                    }`
                  }
                >
                  <span className="font-medium text-sm">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Weather Widget */}
          <div className="hidden md:block">
            <WeatherWidget />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2 rounded-md backdrop-blur-xl bg-black/20 border border-gray-700/40 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          {/* Mobile IMD Title */}
          <div className="text-center mb-3">
            <h1 className="text-white text-lg font-bold tracking-tight">
              India Meteorological Department
            </h1>
            <p className="text-gray-400 text-xs">
              Ministry of Earth Sciences, Government of India
            </p>
          </div>
          
          <nav className="flex flex-col space-y-2 bg-gray-900/30 backdrop-blur-xl rounded-lg p-3 border border-gray-700/40">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-900/30 text-cyan-300'
                      : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                  }`
                }
              >
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            ))}
            
            {/* Mobile Weather Widget */}
            <div className="py-2 px-1 mt-2 border-t border-gray-700/30">
              <WeatherWidget />
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-gray-900/20 border border-gray-800/40 rounded-xl shadow-2xl p-6 animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-black/20 border-t border-gray-800/40 py-3 px-6">
        <div className="text-center text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} India Meteorological Department. All rights reserved.
          </div>
          <p className="mt-1 opacity-80">Developed with expertise by IMD.</p>
        </div>
      </footer>
    </div>
  );
}
