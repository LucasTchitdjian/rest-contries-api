import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from './Header';
import { FaArrowLeft } from "react-icons/fa";
import countries from 'country-list-js';
import './SingleCountry.css';

// Cette fonction transforme l'objet currencies en une chaîne de texte
const getCurrencies = (currencies) => {
    return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ');
};

export function SingleCountry() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const getCountryData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const data = await response.json();
                setCountry(data[0]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getCountryData();
    }, [name]);

    if (!country) return <div className='loading'>Loading...</div>;

    const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A';
    const currencies = country.currencies ? getCurrencies(country.currencies) : 'N/A';

    return (
        <>
            <Header />
            <Link to="/" className="btn-back">
                <FaArrowLeft />
                <span>Back</span> {/* Use <span> instead of <p> for inline elements like this */}
            </Link>
            <div className="single-country">
                <div className="image">
                    <img src={country.flags.png} alt={country.name.common} />
                </div>
                <div className="column">
                    <div className="top">
                        <div className="info-container">
                            <div className="container-1">
                                <h3>{country.name.common}</h3>
                                <div className="container"><p className='title'>Native Name:</p> <p className='value'>{nativeName}</p></div>
                                <div className="container"><p className='title'>Population:</p> <p className='value'>{country.population}</p></div>
                                <div className="container"><p className='title'>Region:</p> <p className='value'>{country.region}</p></div>
                                <div className="container"><p className='title'>Sub Region:</p> <p className='value'>{country.subregion}</p></div>
                                <div className="container"><p className='title'>Capital:</p> <p className='value'>{country.capital}</p></div>
                            </div>
                            <div className="container-2">
                                <div className="container"><p className='title'>Top Level Domain:</p> <p className='value'>{country.tld ? country.tld[0] : 'N/A'}</p></div>
                                <div className="container"><p className='title'>Currencies:</p> <p className='value'>{currencies}</p></div>
                                <div className="container"><p className='title'>Languages:</p> <p className='value'>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="border-countries">
                            <div className="container-1">
                                <p>Border Countries:</p>
                            </div>
                            <div className="border-countries-list">
                                {country.borders && country.borders.length > 0 ? (
                                    country.borders.map(border => {
                                        // Utilisez findByIso3 pour récupérer les informations du pays
                                        const borderCountry = countries.findByIso3(border);
                                        const borderName = borderCountry ? borderCountry.name : 'Unknown';
                                        return (
                                            <Link key={border} to={`/country/${border}`}>
                                                <button>{borderName}</button>
                                            </Link>
                                        );
                                    })
                                ) : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
