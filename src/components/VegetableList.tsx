
import React from 'react';
import VegetableCard from './VegetableCard';
import { Vegetable } from '../services/api';

interface VegetableListProps {
  vegetables: Vegetable[];
  isLoading: boolean;
  error: Error | null;
}

const VegetableList: React.FC<VegetableListProps> = ({ 
  vegetables, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loading-spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 rounded-lg p-6 inline-block">
          <h3 className="text-lg font-medium text-destructive mb-2">Error Loading Data</h3>
          <p className="text-muted-foreground">
            We couldn't load the vegetable data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Safety check - ensure vegetables is an array
  if (!vegetables || !Array.isArray(vegetables)) {
    console.error('Expected vegetables to be an array but got:', vegetables);
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No vegetables data available.</p>
      </div>
    );
  }

  if (vegetables.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No vegetables found.</p>
      </div>
    );
  }

  return (
    <div className="vegetable-container">
      {vegetables.map((vegetable, index) => (
        <VegetableCard 
          key={vegetable.id || index} 
          vegetable={vegetable} 
          animationDelay={index * 50}
        />
      ))}
    </div>
  );
};

export default VegetableList;
