// src/components/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Prediction', path: '/predict', icon: '📊' },
    { name: 'Correlation', path: '/correlation', icon: '📈' },
    { name: 'Team', path: '/team', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="shadow-xl py-4 px-6 relative z-50" style={{ background: 'linear-gradient(to right, #2596be, #1e7ba8)' }}>
        <div className="flex items-center justify-center">
          {/* Centered Header content */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="Government of India Logo" 
              className="h-12 w-auto object-contain drop-shadow-md" 
            />
            <div className="text-center">
              <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">
                India Meteorological Department
              </h1>
              <p className="text-blue-200 text-xs md:text-sm">
                Ministry of Earth Sciences, Government of India
              </p>
              <p className="text-blue-200 text-sm font-semibold tracking-wide mt-1">
                Radiation Forecast Predictor
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <aside className="w-56 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
          <div className="p-3 h-full overflow-hidden">
            <nav className="space-y-1 mt-3">
              <h2 className="text-base font-bold mb-4 px-2" style={{ color: '#2596be' }}>
                Navigation
              </h2>
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                  style={({ isActive }) => isActive ? { backgroundColor: '#2596be' } : {}}
                >
                  <span className="text-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-medium whitespace-nowrap text-sm">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-white overflow-y-auto">
          <div className="min-h-full animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-blue-100 py-3 px-6" style={{ backgroundColor: '#1e7ba8' }}>
        <div className="text-center text-xs">
          <div>
            &copy; {new Date().getFullYear()} India Meteorological Department. All rights reserved.
          </div>
          <p className="mt-1 opacity-80">Developed with expertise by IMD.</p>
        </div>
      </footer>
    </div>
  );
}
