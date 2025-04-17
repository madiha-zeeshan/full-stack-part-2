import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  // Fetch countries based on search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        axios
          .get(`https://restcountries.com/v3.1/name/${query}`)
          .then((response) => {
            setCountries(response.data);
            setError('');
          })
          .catch((error) => {
            setError('No matching countries found');
            setCountries([]);
          });
      } else {
        setCountries([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Fetch weather for selected capital
  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      const capital = selectedCountry.capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error('Weather fetch error:', error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);

  const renderWeather = () => {
    if (!weather) return null;

    return (
      <div>
        <h4>Weather in {weather.name}</h4>
        <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
      </div>
    );
  };

  const renderCountryDetails = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />
      {renderWeather()}
    </div>
  );

  const renderCountries = () => {
    if (selectedCountry) {
      return renderCountryDetails(selectedCountry);
    }

    if (countries.length > 10) {
      return <div>Too many matches, please be more specific.</div>;
    } else if (countries.length > 1) {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else if (countries.length === 1) {
      if (!selectedCountry || selectedCountry.name.common !== countries[0].name.common) {
        setSelectedCountry(countries[0]); // Important for weather effect
      }
      return renderCountryDetails(countries[0]);
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {renderCountries()}
    </div>
  );
};

export default App;