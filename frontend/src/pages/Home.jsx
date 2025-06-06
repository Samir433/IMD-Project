import React from 'react';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#2596be' }}>
          Radiation Prediction & Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced machine learning models for accurate radiation forecasting and meteorological parameter correlation
        </p>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Prediction Feature */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-semibold" style={{ color: '#2596be' }}>Radiation Forecasts</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Accurate predictions for Global Solar Radiation (GSR) and Diffuse Solar Radiation (DSR) with customizable timeframes.
          </p>
        </div>

        {/* Correlation Feature */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📈</span>
            <h3 className="text-lg font-semibold text-green-800">Parameter Correlation</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Analyze relationships between radiation data and meteorological parameters like temperature, evaporation, and sunshine duration.
          </p>
        </div>

        {/* ML Technology Feature */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">🧠</span>
            <h3 className="text-lg font-semibold text-purple-800">ML-Powered</h3>
          </div>
          <p className="text-gray-700 text-sm">
            State-of-the-art machine learning algorithms ensure superior predictive accuracy and data correction capabilities.
          </p>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Applications & Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">☀️</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Public Health & Safety</h4>
              <p className="text-gray-600 text-sm">UV radiation guidance for public well-being and safety measures.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">⚡</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Renewable Energy</h4>
              <p className="text-gray-600 text-sm">Optimize solar energy planning and resource management.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">🌾</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Agriculture</h4>
              <p className="text-gray-600 text-sm">Support smart farming practices and climate-adaptive strategies.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">🔬</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Research</h4>
              <p className="text-gray-600 text-sm">Advance atmospheric science and climate modeling research.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="text-center text-white rounded-xl p-6" style={{ backgroundColor: '#2596be' }}>
        <h2 className="text-xl font-bold mb-3">Get Started</h2>
        <p className="text-blue-100 mb-5 max-w-2xl mx-auto text-sm">
          Explore our prediction tools and correlation analysis to access actionable environmental intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="/predict" 
            className="bg-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm"
            style={{ color: '#2596be' }}
          >
            Start Prediction
          </a>
          <a 
            href="/correlation" 
            className="border-2 border-white text-white px-5 py-2 rounded-lg font-semibold hover:bg-white transition-colors duration-200 text-sm"
            style={{ '&:hover': { color: '#2596be' } }}
            onMouseEnter={(e) => e.target.style.color = '#2596be'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            View Correlations
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
