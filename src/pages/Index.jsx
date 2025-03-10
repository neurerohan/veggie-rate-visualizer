
import React, { useState, useEffect } from 'react';
import './Index.css';

// Component for the header section
const Header = () => (
  <header className="mb-8 text-center">
    <h1 className="text-3xl font-bold mb-2">Kalimati Tarkari Rate</h1>
    <p className="text-gray-600">Current vegetable prices from Kalimati market</p>
  </header>
);

// Search bar component
const SearchBar = ({ onSearch }) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search vegetables..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>
);

// Sort selector component
const SortSelector = ({ onSortChange, currentSort }) => (
  <div className="flex items-center space-x-2">
    <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
    <select
      id="sort"
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
    </select>
  </div>
);

// Vegetable list component
const VegetableList = ({ vegetables, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-2">Failed to load data</p>
        <p className="text-gray-600">{error.message || "Unknown error occurred"}</p>
      </div>
    );
  }

  if (vegetables.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No vegetables found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {vegetables.map((vegetable) => (
        <div key={vegetable.id} className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105">
          <h3 className="font-bold text-lg mb-1">{vegetable.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{vegetable.name_nepali}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">Min: <span className="font-medium">Rs.{vegetable.min_price}</span></span>
            <span className="text-sm">Max: <span className="font-medium">Rs.{vegetable.max_price}</span></span>
          </div>
          <p className="mt-2 text-blue-600 font-semibold">Avg: Rs.{vegetable.avg_price}</p>
          <p className="text-xs text-gray-500 mt-2">Updated: {new Date(vegetable.scrape_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

// Main Index component
const Index = () => {
  const [vegetables, setVegetables] = useState([]);
  const [filteredVegetables, setFilteredVegetables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sample data
  const mockVegetables = [
    { id: 1, name: 'Potato', name_nepali: 'आलु', unit: 'kg', min_price: '40', max_price: '50', avg_price: '45', scrape_date: '2023-11-15' },
    { id: 2, name: 'Tomato', name_nepali: 'गोलभेडा', unit: 'kg', min_price: '85', max_price: '95', avg_price: '90', scrape_date: '2023-11-15' },
    { id: 3, name: 'Onion', name_nepali: 'प्याज', unit: 'kg', min_price: '55', max_price: '65', avg_price: '60', scrape_date: '2023-11-15' },
    { id: 4, name: 'Cabbage', name_nepali: 'बन्दा', unit: 'kg', min_price: '25', max_price: '35', avg_price: '30', scrape_date: '2023-11-15' }
  ];

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from API
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        
        // Using mock data for demonstration
        setTimeout(() => {
          setVegetables(mockVegetables);
          setFilteredVegetables(mockVegetables);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter and sort vegetables whenever searchQuery or sortOption changes
    let filtered = [...vegetables];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(veg => 
        veg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        veg.name_nepali.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort based on selected option
    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => parseFloat(a.avg_price) - parseFloat(b.avg_price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.avg_price) - parseFloat(a.avg_price));
        break;
      default:
        break;
    }
    
    setFilteredVegetables(filtered);
  }, [vegetables, searchQuery, sortOption]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <Header />
      
      <div className="mb-8 space-y-4">
        <SearchBar onSearch={handleSearch} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SortSelector 
            onSortChange={handleSortChange} 
            currentSort={sortOption} 
          />
          
          {!isLoading && (
            <p className="text-sm text-gray-600">
              Showing {filteredVegetables.length} of {vegetables.length} vegetables
            </p>
          )}
        </div>
      </div>
      
      <VegetableList 
        vegetables={filteredVegetables} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
};

export default Index;
