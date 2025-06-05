import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 sm:px-8 bg-gray-50 font-sans"> {/* Added background and font */}
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-8xl border border-gray-100 transform transition-all duration-300 ease-in-out hover:shadow-2xl"> {/* More rounded corners, enhanced shadow */}
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-4 leading-tight tracking-tight"> {/* Larger, bolder, tighter tracking */}
          Radiation Prediction and Correction between Meteorological Parameters
          <br className="hidden sm:inline" />
        </h1>
        <p className="text-xl text-gray-700 text-center mb-10 max-w-3xl mx-auto leading-relaxed"> {/* Larger text, relaxed leading */}
          The India Meteorological Department (IMD) delivers critical environmental intelligence. Our system integrates cutting-edge <strong className="text-blue-700">Machine Learning (ML) models</strong> to provide highly accurate <strong className="text-blue-700">Radiation Prediction</strong>, empowering various sectors and ensuring public well-being through advanced data analysis.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"> {/* Adjusted to lg:grid-cols-2 for wider screens */}
          {/* Our Capabilities Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg border border-blue-200"> {/* Gradient background, deeper shadow */}
            <h3 className="text-2xl font-bold text-blue-800 mb-5">Our Capabilities:</h3>
            <ul className="list-none text-gray-700 text-lg space-y-4"> {/* Removed default list styling, increased spacing */}
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">⚡</span>
                <p>
                  <strong className="text-blue-700">Precision Radiation Forecasts:</strong> Obtain accurate predictions for Global Solar Radiation (GSR) and Diffuse Solar Radiation (DSR) on both yearly and daily bases.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">📊</span> {/* New icon */}
                <p>
                  <strong className="text-blue-700">Parametric Correlation & Correction:</strong> Analyze and refine radiation data by correlating it with key meteorological parameters including Minimum/Maximum Temperature, Evaporation, and Hourly Sunshine Duration (SSH).
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">⏱️</span>
                <p>
                  <strong className="text-blue-700">Flexible Projections:</strong> Customizable forecast durations to meet your operational or research requirements.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 text-2xl">🧠</span>
                <p>
                  <strong className="text-blue-700">ML-Driven Accuracy:</strong> Leveraging state-of-the-art machine learning algorithms for superior predictive and corrective performance.
                </p>
              </li>
            </ul>
          </div>

          {/* Impact & Applications Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg border border-green-200"> {/* Different gradient, deeper shadow */}
            <h3 className="text-2xl font-bold text-green-800 mb-5">Impact & Applications:</h3>
            <ul className="list-none text-gray-700 text-lg space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-2xl">☀️</span>
                <p>
                  <strong className="text-green-700">Public Well-being:</strong> Providing crucial guidance for safeguarding against harmful UV radiation exposure.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-2xl">⚡</span>
                <p>
                  <strong className="text-green-700">Renewable Energy Optimization:</strong> Enabling efficient planning and resource management for solar energy installations.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-2xl">🌾</span>
                <p>
                  <strong className="text-green-700">Agricultural Resilience:</strong> Informing smart farming practices and climate-adaptive strategies for sustainable yields.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 text-2xl">🔬</span>
                <p>
                  <strong className="text-green-700">Scientific Advancement:</strong> Supporting critical research in atmospheric science, climate modeling, and environmental studies.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-center text-gray-600 mt-8 pt-6 border-t-2 border-gray-100 mx-auto max-w-4xl"> {/* Thicker border, wider text area */}
          This platform is designed to be an invaluable resource, empowering meteorologists, researchers, energy sector professionals, agricultural planners, and the general public across India with actionable environmental intelligence.
        </p>
      </div>
    </div>
  );
};

export default Home;
