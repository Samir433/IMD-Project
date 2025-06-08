import React from 'react';
import { Link } from 'react-router-dom';

// Home component displays the landing page UI for the Radiation Prediction & Analysis application
const Home = () => {
  return (
    <div className="space-y-6 p-2">
      
      {/* ------------------- Hero Section ------------------- */}
      <div className="text-center space-y-3 py-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-cyan-300">
          Radiation Prediction & Analysis
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto px-3">
          Advanced machine learning models for accurate radiation forecasting and meteorological parameter correlation
        </p>
      </div>

      {/* ------------------- Key Features Grid ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
        
        {/* Feature: Radiation Forecasts */}
        <div className="backdrop-blur-xl bg-black/20 border border-gray-700/40 rounded-md p-5 hover:bg-black/25 transition-all duration-300 shadow-glass hover:shadow-glass-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-semibold text-cyan-300">Radiation Forecasts</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Accurate predictions for Global Solar Radiation (GSR) and Diffuse Solar Radiation (DSR) with customizable timeframes.
          </p>
        </div>

        {/* Feature: Parameter Correlation */}
        <div className="backdrop-blur-xl bg-black/20 border border-gray-700/40 rounded-md p-5 hover:bg-black/25 transition-all duration-300 shadow-glass hover:shadow-glass-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📈</span>
            <h3 className="text-lg font-semibold text-cyan-300">Parameter Correlation</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Analyze relationships between radiation data and meteorological parameters like temperature, evaporation, and sunshine duration.
          </p>
        </div>

        {/* Feature: ML-Powered Models */}
        <div className="backdrop-blur-xl bg-black/20 border border-gray-700/40 rounded-md p-5 hover:bg-black/25 transition-all duration-300 shadow-glass hover:shadow-glass-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">🧠</span>
            <h3 className="text-lg font-semibold text-cyan-300">ML-Powered</h3>
          </div>
          <p className="text-gray-400 text-sm">
            State-of-the-art machine learning algorithms ensure superior predictive accuracy and data correction capabilities.
          </p>
        </div>
      </div>

      {/* ------------------- Applications & Impact Section ------------------- */}
      <div className="backdrop-blur-xl bg-gray-900/20 border border-gray-700/40 rounded-md p-6 mx-2">
        <h2 className="text-2xl font-bold text-center text-cyan-300 mb-6">Applications & Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Application: Public Health & Safety */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">☀️</span>
            <div>
              <h4 className="font-semibold text-white mb-2">Public Health & Safety</h4>
              <p className="text-gray-400 text-sm">
                UV radiation guidance for public well-being and safety measures.
              </p>
            </div>
          </div>

          {/* Application: Renewable Energy */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">⚡</span>
            <div>
              <h4 className="font-semibold text-white mb-2">Renewable Energy</h4>
              <p className="text-gray-400 text-sm">
                Optimize solar energy planning and resource management.
              </p>
            </div>
          </div>

          {/* Application: Agriculture */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">🌾</span>
            <div>
              <h4 className="font-semibold text-white mb-2">Agriculture</h4>
              <p className="text-gray-400 text-sm">
                Support smart farming practices and climate-adaptive strategies.
              </p>
            </div>
          </div>

          {/* Application: Research */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">🔬</span>
            <div>
              <h4 className="font-semibold text-white mb-2">Research</h4>
              <p className="text-gray-400 text-sm">
                Advance atmospheric science and climate modeling research.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Quick Start Section ------------------- */}
      <div className="text-center text-white backdrop-blur-xl bg-cyan-900/30 border border-cyan-800/40 rounded-md p-6 mx-2">
        <h2 className="text-xl font-bold mb-3">Get Started</h2>
        <p className="text-gray-300 mb-5 max-w-2xl mx-auto text-sm">
          Explore our prediction tools and correlation analysis to access actionable environmental intelligence.
        </p>

        {/* CTA Buttons to Navigate to Prediction & Correlation Tools */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/predict" 
            className="border border-cyan-700/40 text-cyan-300 px-5 py-2 rounded-md font-medium hover:bg-cyan-900/30 transition-all duration-200 text-sm"
          >
            Start Prediction
          </Link>
          <Link
            to="/correlation" 
            className="border border-cyan-700/40 text-cyan-300 px-5 py-2 rounded-md font-medium hover:bg-cyan-900/30 transition-all duration-200 text-sm"
          >
            View Correlations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
