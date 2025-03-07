
import React from 'react';
import { ArrowUpDown, ArrowDownUp, SortAsc, SortDesc } from 'lucide-react';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface SortSelectorProps {
  onSortChange: (sortBy: SortOption) => void;
  currentSort: SortOption;
}

const SortSelector: React.FC<SortSelectorProps> = ({ onSortChange, currentSort }) => {
  return (
    <div className="flex items-center space-x-2 animate-fade-in">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <div className="flex border rounded-lg overflow-hidden">
        <button
          className={`px-3 py-2 text-sm flex items-center space-x-1 transition-colors ${
            currentSort === 'name-asc' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => onSortChange('name-asc')}
          aria-label="Sort by name ascending"
        >
          <span>Name</span>
          <SortAsc className="h-3 w-3" />
        </button>
        
        <button
          className={`px-3 py-2 text-sm flex items-center space-x-1 transition-colors ${
            currentSort === 'name-desc' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => onSortChange('name-desc')}
          aria-label="Sort by name descending"
        >
          <span>Name</span>
          <SortDesc className="h-3 w-3" />
        </button>
        
        <button
          className={`px-3 py-2 text-sm flex items-center space-x-1 transition-colors ${
            currentSort === 'price-asc' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => onSortChange('price-asc')}
          aria-label="Sort by price ascending"
        >
          <span>Price</span>
          <ArrowUpDown className="h-3 w-3" />
        </button>
        
        <button
          className={`px-3 py-2 text-sm flex items-center space-x-1 transition-colors ${
            currentSort === 'price-desc' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => onSortChange('price-desc')}
          aria-label="Sort by price descending"
        >
          <span>Price</span>
          <ArrowDownUp className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default SortSelector;
