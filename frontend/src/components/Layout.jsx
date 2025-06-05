// src/components/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const activeLinkClasses = "bg-blue-600 text-white shadow-md"; // Styles for the active NavLink
  const defaultLinkClasses = "text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition duration-200 ease-in-out"; // Default styles for NavLink

  // Define approximate heights for header and footer, and width for sidebar
  const headerHeight = "h-[110px]"; // Height of the fixed header
  const footerHeight = "h-[70px]";  // Height of the fixed footer
  const sidebarWidth = "w-72";      // Width of the fixed sidebar (Tailwind w-72 = 18rem = 288px)

  return (
    // Root div: flex-col to stack header, content, footer vertically, min-h-screen for full viewport height
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 relative">

      {/* Header: Fixed at the top, full width, with a specific height */}
      <header className={`fixed top-0 inset-x-0 bg-gradient-to-r from-blue-700 to-blue-900 shadow-xl py-3 z-50 ${headerHeight}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <img src="/imd_logo.png" alt="IMD Logo" className="h-16 w-auto object-contain drop-shadow-md flex-shrink-0" />
            <div className="text-left flex-shrink-0">
              <h1 className="text-white text-3xl font-extrabold tracking-tight">India Meteorological Department</h1>
              <p className="text-blue-200 text-sm mt-1">Ministry of Earth Sciences, Government of India</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-blue-200 text-lg font-semibold tracking-wide flex-shrink-0">
            Radiation Forecast Predictor
          </div>
        </div>
      </header>

      {/* Main Content Area Wrapper: This div takes remaining space between header and footer.
          It now only manages padding-top and padding-bottom for the fixed header/footer. */}
      <div className={`flex flex-1 overflow-hidden pt-[110px] pb-[70px]`}> {/* Pushed content down/up by header/footer height */}

        {/* Sidebar: Now fixed to the left, stretching between header and footer */}
        <aside className={`fixed left-0 z-40 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col ${sidebarWidth}`}
               style={{ top: '110px', bottom: '70px' }}> {/* Positioned relative to fixed header/footer heights */}
          <nav className="flex flex-col space-y-3">
            <h2 className="text-lg font-bold text-blue-800 mb-4">Navigation</h2>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center space-x-3 text-lg ${
                  isActive ? activeLinkClasses : defaultLinkClasses
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center space-x-3 text-lg ${
                  isActive ? activeLinkClasses : defaultLinkClasses
                }`
              }
            >
              Prediction
            </NavLink>
            <NavLink
              to="/correlation"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center space-x-3 text-lg ${
                  isActive ? activeLinkClasses : defaultLinkClasses
                }`
              }
            >
              Correlation
            </NavLink>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center space-x-3 text-lg ${
                  isActive ? activeLinkClasses : defaultLinkClasses
                }`
              }
            >
              Team
            </NavLink>
          </nav>
        </aside>

        {/* Dynamic Content Main Area: This is the scrollable section.
            It now has a margin-left to offset the fixed sidebar. */}
        <main className={`flex-1 p-8 bg-gray-100 overflow-y-auto ml-[288px]`}> {/* Added ml-[288px] for sidebar width */}
          <div className="bg-white rounded-lg shadow-md p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer: Fixed at the bottom, full width, with a specific height */}
      <footer className={`fixed bottom-0 inset-x-0 bg-blue-900 text-blue-100 py-4 z-50 shadow-inner ${footerHeight}`}>
        <div className="max-w-7xl mx-auto px-6 text-center text-xs h-full flex items-center justify-center">
          <div>
            &copy; {new Date().getFullYear()} India Meteorological Department. All rights reserved.
            <p className="mt-1 opacity-80">Developed with expertise by IMD.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
