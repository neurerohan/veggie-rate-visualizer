import React, { useState, useEffect } from 'react';
import { fetchVegetables } from '../services/api.js';
import './Index.css';

const Index = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  useEffect(() => {
    const loadVegetables = async () => {
      try {
        setLoading(true);
        const data = await fetchVegetables();
        setVegetables(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load vegetables data');
        setLoading(false);
        console.error('Error loading vegetables:', err);
      }
    };

    loadVegetables();
  }, []);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle sort selection
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sort vegetables based on selected option
  const sortVegetables = (veggies, option) => {
    const sorted = [...veggies];

    switch (option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  // Filter vegetables based on search query
  const filteredVegetables = vegetables.filter(vegetable =>
    vegetable.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered vegetables
  const sortedVegetables = sortVegetables(filteredVegetables, sortOption);

  return (
    <div className="vegetables-page">
      <h1>Kalimati Vegetable Prices</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search vegetables..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />

        <select 
          value={sortOption} 
          onChange={(e) => handleSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="vegetables-grid">
          {sortedVegetables.map(vegetable => (
            <div key={vegetable.id} className="vegetable-card">
              <h2>{vegetable.name}</h2>
              <p className="nepali-name">{vegetable.name_nepali}</p>
              <div className="price">
                <span>Min: Rs. {vegetable.min_price}</span>
                <span>Max: Rs. {vegetable.max_price}</span>
              </div>
              <div className="avg-price">
                <span>Avg: Rs. {vegetable.avg_price}</span>
              </div>
              <div className="meta">
                <span>Per {vegetable.unit}</span>
                <span>Date: {new Date(vegetable.scrape_date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;