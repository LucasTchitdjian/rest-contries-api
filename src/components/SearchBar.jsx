import React from 'react';
import { IoIosSearch } from "react-icons/io";
import './SearchBar.css';
import { useEffect, useState } from 'react';

export function SearchBar() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        // Create a new Set to store unique regions
        const uniqueRegions = new Set(data.map((country) => country.region));
        // Convert the Set back into an array
        const regionsArray = Array.from(uniqueRegions);
        setCountries(regionsArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getAllCountries();
  }, []);


  return (
    <div className='search-bar'>
      <div className="search-input-container">
        <IoIosSearch className="search-icon" />
        <input type="text" placeholder="Search for a country..." />
      </div>
      <select className='select-style'>
        <option value="">Filter by Region</option>
        {countries.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
