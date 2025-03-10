import React, { useState, useEffect } from 'react';
import { fetchVegetables } from '../services/api.js';
import './Index.css';

const VegetableCard = ({ vegetable }) => {
  // Format price to remove decimal places
  const formatPrice = (price) => {
    return Math.round(price).toString();
  };

  return (
    <div className="vegetable-card">
      <h2>{vegetable.name}</h2>
      <div className="nepali-name">{vegetable.name_nepali}</div>
      
      <div className="price-container">
        <div className="price-box min">
          <span className="price-label">Min</span>
          <span className="price-value">{formatPrice(vegetable.min_price)}</span>
        </div>
        <div className="price-box avg">
          <span className="price-label">Avg</span>
          <span className="price-value">{formatPrice(vegetable.avg_price)}</span>
        </div>
        <div className="price-box max">
          <span className="price-label">Max</span>
          <span className="price-value">{formatPrice(vegetable.max_price)}</span>
        </div>
      </div>

      <div className="meta">
        <span>Per {vegetable.unit}</span>
        <span>Date: {new Date(vegetable.scrape_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const VegetableTable = ({ vegetables }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="table-container">
      <table className="vegetable-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Avg</th>
            <th className="mobile-only">Details</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map(vegetable => (
            <React.Fragment key={vegetable.id}>
              <tr>
                <td>{vegetable.name}</td>
                <td>{vegetable.unit}</td>
                <td className="price-cell avg">Rs. {Math.round(vegetable.avg_price)}</td>
                <td className="mobile-only">
                  <button 
                    className={`expand-button ${expandedRows.has(vegetable.id) ? 'expanded' : ''}`}
                    onClick={() => toggleRow(vegetable.id)}
                    aria-label="Toggle price details"
                  >
                    {expandedRows.has(vegetable.id) ? '−' : '+'}
                  </button>
                </td>
              </tr>
              <tr className={`price-details ${expandedRows.has(vegetable.id) ? 'expanded' : ''}`}>
                <td colSpan="4">
                  <div className="price-details-content">
                    <div className="price-detail-item">
                      <span className="label">Min:</span>
                      <span className="price min">Rs. {Math.round(vegetable.min_price)}</span>
                    </div>
                    <div className="price-detail-item">
                      <span className="label">Max:</span>
                      <span className="price max">Rs. {Math.round(vegetable.max_price)}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Index = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  const loadVegetables = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch vegetables...');
      const data = await fetchVegetables();
      console.log('Received data:', data);
      
      if (data && data.length > 0) {
        setVegetables(data);
      } else {
        setError('No vegetables data available. The API returned an empty list.');
      }
    } catch (err) {
      console.error('Error in loadVegetables:', err);
      setError(err.message || 'Failed to load vegetables data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        return sorted.sort((a, b) => a.avg_price - b.avg_price);
      case 'price-desc':
        return sorted.sort((a, b) => b.avg_price - a.avg_price);
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

      {loading ? (
        <div className="loading-container">
          <div className="loading">Loading vegetables data...</div>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={loadVegetables} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search vegetables by name..."
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

          {sortedVegetables.length === 0 ? (
            <div className="no-results">
              No vegetables found matching your search.
            </div>
          ) : (
            <>
              <VegetableTable vegetables={sortedVegetables} />
              <div className="vegetables-grid">
                {sortedVegetables.map(vegetable => (
                  <VegetableCard key={vegetable.id} vegetable={vegetable} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Index;