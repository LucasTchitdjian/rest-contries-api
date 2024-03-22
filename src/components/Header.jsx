import './Header.css';
import { FaRegMoon } from "react-icons/fa";

export function Header() {
    return (
        <header>
            <ul>
                <li>Where in the world?</li>
                <li className='dark-mode'><FaRegMoon /> Dark Mode</li>
            </ul>
        </header>
    )
}