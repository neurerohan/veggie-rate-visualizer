
import React, { useState, useEffect } from 'react';
import { getVegetables, Vegetable } from '../services/api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import VegetableList from '../components/VegetableList';
import SortSelector, { SortOption } from '../components/SortSelector';
import { toast } from '../components/ui/use-toast';

const Index = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [filteredVegetables, setFilteredVegetables] = useState<Vegetable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  // Fetch vegetables on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getVegetables();
        setVegetables(data);
        setFilteredVegetables(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err as Error);
        toast({
          title: "Error fetching data",
          description: "Could not load vegetable data. Please try again later.",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, []);

  // Filter and sort vegetables when search query or sort option changes
  useEffect(() => {
    let result = [...vegetables];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(veg => 
        veg.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    result = sortVegetables(result, sortOption);
    
    setFilteredVegetables(result);
  }, [vegetables, searchQuery, sortOption]);

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle sort selection
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  // Sort vegetables based on selected option
  const sortVegetables = (veggies: Vegetable[], option: SortOption): Vegetable[] => {
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
            <p className="text-sm text-muted-foreground">
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
