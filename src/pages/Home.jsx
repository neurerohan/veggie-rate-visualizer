import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Veggie Rate Visualizer</h1>
      <p>Your one-stop destination for Kalimati vegetable prices.</p>
      <Link to="/kalimati-tarkari-rate-today/" className="view-prices-btn">
        View Vegetable Prices
      </Link>
    </div>
  );
};

export default Home; 