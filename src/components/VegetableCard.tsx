
import React from 'react';
import { Vegetable } from '../services/api';

interface VegetableCardProps {
  vegetable: Vegetable;
  animationDelay?: number;
}

const VegetableCard: React.FC<VegetableCardProps> = ({ vegetable, animationDelay = 0 }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return 'Date unavailable';
    }
  };

  // Format price with correct currency symbol, handling null/undefined values
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) {
      return 'Price unavailable';
    }
    return `NPR ${price.toFixed(2)}`;
  };

  return (
    <div 
      className={`vegetable-card animate-fade-in-up`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="vegetable-card-header">
        <span className="badge">Vegetable</span>
      </div>
      <div className="vegetable-card-body">
        <h3 className="vegetable-name">{vegetable.name}</h3>
        <p className="vegetable-price">{formatPrice(vegetable.price)}</p>
        <p className="vegetable-date">
          Last updated: {formatDate(vegetable.updated_at)}
        </p>
      </div>
    </div>
  );
};

export default VegetableCard;
