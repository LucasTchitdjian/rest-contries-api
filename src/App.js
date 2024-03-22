import './App.css';
import { CountryList } from './components/CountryList';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CountryList />
    </div>
  );
}

export default App;
