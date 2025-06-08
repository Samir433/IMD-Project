import { useState, useEffect } from 'react';

// WeatherWidget component shows simulated weather for Pune
const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);    // Weather data state
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state

  useEffect(() => {
    // Simulated weather function (no external API used)
    const getSimulatedWeather = () => {
      const now = new Date();
      const currentHour = now.getHours();

      let weatherData;

      // Simulate weather data based on time of day
      if (currentHour >= 6 && currentHour < 18) {
        // Daytime simulation
        weatherData = {
          location: { name: 'Pune', region: 'Maharashtra' },
          current: {
            temp_c: Math.floor(25 + Math.random() * 7), // 25–32°C
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
          },
        };
      } else {
        // Nighttime simulation
        weatherData = {
          location: { name: 'Pune', region: 'Maharashtra' },
          current: {
            temp_c: Math.floor(18 + Math.random() * 5), // 18–23°C
            condition: {
              text: 'Clear',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
            },
          },
        };
      }

      // Simulate network delay (700ms)
      setTimeout(() => {
        setWeather(weatherData);
        setLoading(false);
      }, 700);
    };

    getSimulatedWeather(); // Initial fetch

    // Refresh weather every 5 minutes
    const intervalId = setInterval(getSimulatedWeather, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="text-xs text-gray-400 flex items-center">
        <div className="animate-pulse">Loading Pune weather...</div>
      </div>
    );
  }

  // Display error state
  if (error || !weather) {
    return (
      <div className="text-xs text-gray-400">
        Pune Weather: Unavailable
      </div>
    );
  }

  // Display weather widget
  return (
    <div className="backdrop-blur-md bg-black/20 rounded-full px-3 py-1 flex items-center space-x-2 border border-gray-700/30">
      <img 
        src={weather.current.condition.icon} 
        alt={weather.current.condition.text} 
        className="h-6 w-6 object-contain"
      />
      <div className="text-xs">
        <div className="font-medium text-cyan-300">Pune, Pashan</div>
        <div className="text-gray-300">{weather.current.temp_c}°C | {weather.current.condition.text}</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
