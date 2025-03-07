
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
  const formatPrice = (price: string | number | null | undefined) => {
    if (price === null || price === undefined) {
      return 'Price unavailable';
    }
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `NPR ${numericPrice.toFixed(2)}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
          {vegetable.unit}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{vegetable.name}</h3>
        <p className="text-sm text-gray-500">{vegetable.name_nepali}</p>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-green-50 p-2 rounded">
            <p className="text-green-800 font-medium">Min</p>
            <p>{formatPrice(vegetable.min_price)}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-blue-800 font-medium">Avg</p>
            <p>{formatPrice(vegetable.avg_price)}</p>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <p className="text-red-800 font-medium">Max</p>
            <p>{formatPrice(vegetable.max_price)}</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          Updated: {formatDate(vegetable.scrape_date)}
        </p>
      </div>
    </div>
  );
};

export default VegetableCard;
