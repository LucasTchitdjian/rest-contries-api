import React from 'react';
import { IoIosSearch } from "react-icons/io";
import './SearchBar.css';
import { useEffect, useState } from 'react';

export function SearchBar({ setSearchTerm, setRegionFilter }) {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const uniqueRegions = new Set(data.map((country) => country.region));
        const regionsArray = Array.from(uniqueRegions);
        setCountries(regionsArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getAllCountries();
  }, []);

  const handleRegionFilter = (event) => {
    setRegionFilter(event.target.value);
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='search-bar'>
      <div className="search-input-container">
        <IoIosSearch className="search-icon" />
        <input onChange={handleSearchTerm} type="text" placeholder="Search for a country..." />
      </div>
      <select id='region-select' onChange={handleRegionFilter} className='select-style'>Filter by region
        {countries.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
