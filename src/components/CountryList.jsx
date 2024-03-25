import { useEffect, useState } from 'react';
import './CountryList.css';
import { Link } from 'react-router-dom';

export function CountryList() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getAllCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getAllCountries();
    }, []);

    return (
        <div className="country-list">
            {countries.map((country) => (
                <div className="card" key={country.name.official}>
                    <Link to={`/country/${encodeURIComponent(country.name.common)}`}>
                        <div className="image">
                            <img src={country.flags.png} alt="" />
                        </div>
                        <h3>{country.name.official}</h3>
                    </Link>
                    <div className="info-container">
                        <p className='title'>Population:</p> <p className='value'>{country.population}</p>
                    </div>
                    <div className="info-container">
                        <p className='title'>Region:</p> <p className='value'>{country.region}</p>
                    </div>
                    <div className="info-container">
                        <p className='title'>Capital:</p> <p className='value'>{country.capital}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}