import React, { useState, useEffect } from 'react';
import './App.css';
import BeerCard from './BeerCard';
import SearchBar from './SearchBar';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.sampleapis.com/beers/ale')
      .then(response => response.json())
      .then(data => {
        setBeers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredData = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="beer-cards">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredData.map(beer => (
            <BeerCard key={beer.id} beer={beer} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
