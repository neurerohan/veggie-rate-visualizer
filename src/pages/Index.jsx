
import React, { useEffect, useState } from 'react';
import './Index.css';

const Index = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // This would normally fetch from your actual API
        // For demo purposes, we'll use dummy data
        const dummyData = [
          { id: 1, name: 'Carrot', price: 1.99, quantity: 50 },
          { id: 2, name: 'Broccoli', price: 2.49, quantity: 30 },
          { id: 3, name: 'Tomato', price: 0.99, quantity: 100 },
          { id: 4, name: 'Spinach', price: 1.79, quantity: 45 },
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setVegetables(dummyData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch vegetables');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading vegetables...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Vegetable Inventory</h1>
      <div className="vegetable-grid">
        {vegetables.map(vegetable => (
          <div key={vegetable.id} className="vegetable-card">
            <h2>{vegetable.name}</h2>
            <p>Price: ${vegetable.price.toFixed(2)}</p>
            <p>Quantity: {vegetable.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
