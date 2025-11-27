import React from 'react';

// search bar component. Uses props to talk to App.
function WeatherSearch({ city, onCityChange, onSearch, onKeyDown }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Enter city name (e.g. Toronto)"
        onChange={(event) => onCityChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default WeatherSearch;
