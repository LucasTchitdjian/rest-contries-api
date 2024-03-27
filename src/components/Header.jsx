import './Header.css';
import { FaRegMoon } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useState } from 'react';

export function Header() {

    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <header>
            <ul>
                <li>Where in the world?</li>
                <li onClick={handleDarkMode} className='dark-mode'>
                    {darkMode ? <FaMoon /> : <FaRegMoon />}
                    Dark Mode
                </li>
            </ul>
        </header>
    )
}
