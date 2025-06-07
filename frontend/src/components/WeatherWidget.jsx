import { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Instead of fetching real-time data (which may require API keys), 
    // we'll use simulated weather data for demonstration purposes
    const getSimulatedWeather = () => {
      // Current date and time in Pune
      const now = new Date();
      const currentHour = now.getHours();
      
      // Simulate weather based on time of day
      let weatherData;
      
      if (currentHour >= 6 && currentHour < 18) {
        // Daytime weather
        weatherData = {
          location: {
            name: 'Pune',
            region: 'Maharashtra'
          },
          current: {
            temp_c: Math.floor(25 + Math.random() * 7), // Random temp between 25-32°C
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
            }
          }
        };
      } else {
        // Nighttime weather
        weatherData = {
          location: {
            name: 'Pune',
            region: 'Maharashtra'
          },
          current: {
            temp_c: Math.floor(18 + Math.random() * 5), // Random temp between 18-23°C
            condition: {
              text: 'Clear',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png'
            }
          }
        };
      }
      
      // Simulate API response delay
      setTimeout(() => {
        setWeather(weatherData);
        setLoading(false);
      }, 700);
    };

    getSimulatedWeather();
    
    // Refresh simulated weather every 5 minutes
    const intervalId = setInterval(getSimulatedWeather, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="text-xs text-gray-400 flex items-center">
        <div className="animate-pulse">Loading Pune weather...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="text-xs text-gray-400">
        Pune Weather: Unavailable
      </div>
    );
  }

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