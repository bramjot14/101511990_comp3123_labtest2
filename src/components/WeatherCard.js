import React from 'react';

// Receives the whole weather object as a prop and displays useful fields.
function WeatherCard({ weather }) {
  const { name, sys, main, weather: weatherArray, wind } = weather;

  const weatherInfo = weatherArray && weatherArray[0];
  const iconUrl = weatherInfo
    ? `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`
    : '';

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div>
          <h2 className="city-name">
            {name}, {sys?.country}
          </h2>
          <p className="weather-description">
            {weatherInfo?.main} &mdash; {weatherInfo?.description}
          </p>
        </div>

        <div className="weather-temp">
          <span className="temp-value">
            {Math.round(main?.temp)}°C
          </span>
          {iconUrl && (
            <img
              src={iconUrl}
              alt={weatherInfo?.description}
              className="weather-icon"
            />
          )}
        </div>
      </div>

      <div className="weather-extra">
        <div className="weather-extra-item">
          <span className="label">Feels like</span>
          <span className="value">
            {Math.round(main?.feels_like)}°C
          </span>
        </div>
        <div className="weather-extra-item">
          <span className="label">Humidity</span>
          <span className="value">{main?.humidity}%</span>
        </div>
        <div className="weather-extra-item">
          <span className="label">Pressure</span>
          <span className="value">{main?.pressure} hPa</span>
        </div>
        <div className="weather-extra-item">
          <span className="label">Wind</span>
          <span className="value">{wind?.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
