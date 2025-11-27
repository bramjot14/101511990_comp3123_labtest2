import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherSearch from './components/WeatherSearch';
import WeatherCard from './components/WeatherCard';

const DEFAULT_CITY = 'Toronto';

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [queryCity, setQueryCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Read API key from .env file (REACT_APP_OPENWEATHER_API_KEY)
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
  
    if (!API_KEY) {
      setError(
        'Missing API key.'
      );
      setWeather(null);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            queryCity
          )}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('City not found. Try a different name.');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setWeather(null);
        setError(
          err.message || 'Something went wrong while fetching weather data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_KEY, queryCity]);

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please type a city name first.');
      return;
    }

    setQueryCity(city.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="app">
      <div className="weather-container">
        <header className="weather-header">
          <h1 className="app-title">Weather App</h1>
          <p className="app-subtitle">
            Current weather using OpenWeatherMap API
          </p>
        </header>

        <WeatherSearch
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />

        <p className="weather-date">{today}</p>

        {loading && <p className="status-message">Loading weather...</p>}

        {error && !loading && (
          <p className="status-message error">{error}</p>
        )}

        {weather && !loading && !error && <WeatherCard weather={weather} />}

        <footer className="weather-footer">
          <p>
            &mdash; data from{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
