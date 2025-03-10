import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Kalimati Vegetable Prices</h1>
      <p>Get real-time vegetable prices from Kalimati Market</p>
      <Link to="/kalimati-tarkari-rate-today" className="view-prices-btn">
        View Vegetable Prices
      </Link>
    </div>
  );
};

export default Home; 