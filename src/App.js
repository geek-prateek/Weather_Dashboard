import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchWeatherData = async () => {
  setLoading(true);
  try {
    const apiKey = 'adad1211d7c2684d28473963500ae610';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('City not found. Please check the spelling.');
    }

    const data = await response.json();
    setWeatherData(data);
    setLoading(false);
    setError(null);
  } catch (error) {
    console.error(error);
    setLoading(false);
    setError(error.message);  
  }
};

useEffect(() => {
  if (cityName) {
    fetchWeatherData();
  }
}, [cityName, unit, fetchWeatherData]);

  const handleSearch = () => {
    if (cityName) {
      fetchWeatherData();
    }
  };

  const toggleTemperatureUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="App">
      <div className="card">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a location (e.g., city)"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        {loading && <div>Searching...</div>}
        {error && <div className="error">{error}</div>}
        {weatherData && (
          <div className="weather">
            <div className="flex">
              <i className="bi bi-geo-alt-fill"></i>
              <h2 className="city">{weatherData.name}</h2>
            </div>
            <h1 className="temp">
              {unit === 'celsius'
                ? `${weatherData.main.temp.toFixed(2)} °C`
                : `${((weatherData.main.temp * 9) / 5 + 32).toFixed(2)} °F`}
            </h1>
            <div id="unit-selector">
              <button
                className="unit-option"
                onClick={toggleTemperatureUnit}
                disabled={loading}
              >
                {unit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
              </button>
            </div>
            <div className="flex">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt=""
                className="icon"
              />
              <div className="description">
                {weatherData.weather[0].description}
              </div>
            </div>
            <hr style={{ width: '80px' }} />
            <div className="info">
              <div className="hum">
                <i className="bi bi-droplet-fill"></i>
                <div className="humidity">{weatherData.main.humidity} %</div>
                <p>Humidity</p>
              </div>
              <div className="speed">
                <i className="bi bi-wind"></i>
                <div className="wind">{weatherData.wind.speed} km/h</div>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
