import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from './Header';
import { FaArrowLeft } from "react-icons/fa";
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

    if (!country) return <div>Loading...</div>;

    const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A';
    // Assurez-vous que country.currencies existe avant de tenter de l'utiliser
    const currencies = country.currencies ? getCurrencies(country.currencies) : 'N/A';

    return (
        <>
            <Header />
            <div className="btn-back">
                <FaArrowLeft />
                <p><Link to='/'>Back</Link></p>
            </div>
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
                            <p>Border Countries:</p>
                            <div className="border-countries-list">
                                {country.borders.length > 0 ? country.borders.map(border => (
                                    <Link key={border} to={`/country/${border}`}>
                                        <button>{border}</button>
                                    </Link>
                                )) : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
