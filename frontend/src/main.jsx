import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';          // Main App component with routing
import './index.css';             // Global CSS styles

// Create root React DOM node and render the App inside StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
