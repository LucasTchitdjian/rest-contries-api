import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { CountryList } from './components/CountryList';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SingleCountry } from './components/SingleCountry';
import { useState } from 'react';

// Composant pour la route racine
function HomePage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  return (
    <div className="App">
      <Header />
      <SearchBar setSearchTerm={setSearchTerm} setRegionFilter={setRegionFilter} />
      <CountryList searchTerm={searchTerm} regionFilter={regionFilter} />
    </div>
  );
}

// Création du router avec les routes correctement configurées
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage /> // Utilisez HomePage au lieu de App ici
  },
  {
    path: '/country/:name',
    element: <SingleCountry />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
