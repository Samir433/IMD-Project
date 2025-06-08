// src/App.jsx

// Import React Router components for routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import main layout and page components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import CorrelationPage from "./pages/CorrelationPage";
import TeamPage from "./pages/TeamPage";

// Main App component defining client-side routes
export default function App() {
  return (
    <Router>
      {/* Define route hierarchy */}
      <Routes>
        {/* Parent route with Layout as wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Index route (default) renders Home */}
          <Route index element={<Home />} />
          {/* Route for prediction page */}
          <Route path="predict" element={<PredictionPage />} />
          {/* Route for correlation analysis page */}
          <Route path="correlation" element={<CorrelationPage />} />
          {/* Route for team information page */}
          <Route path="team" element={<TeamPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
