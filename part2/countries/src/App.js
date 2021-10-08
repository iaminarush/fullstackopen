import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  );
};

const CountryList = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Details country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((filteredCountry) => (
          <CountryRow
            key={filteredCountry.name.common}
            country={filteredCountry}
          />
        ))
      )}
    </>
  );
};

const CountryRow = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div style={{ whiteSpace: "nowrap" }}>
        <p style={{ display: "inline-block" }}>{country.name.common}</p>
        <button onClick={handleClick} style={{ display: "inline-block" }}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>

      {showDetails ? (
        <div>
          <Details country={country} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const Details = ({ country }) => {
  console.log(country);
  return (
    <>
      <h3>{country.name.common}</h3>
      <p>capital {country?.capital[0]}</p>
      <p>population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country's flag" />
    </>
  );
};

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Filter value={filter} onChange={handleFilter} />
      <CountryList countries={countries} filter={filter} />
    </>
  );
}

export default App;
