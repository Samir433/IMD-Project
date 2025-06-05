// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import CorrelationPage from "./pages/CorrelationPage";
import TeamPage from "./pages/TeamPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="predict" element={<PredictionPage />} />
          <Route path="correlation" element={<CorrelationPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
