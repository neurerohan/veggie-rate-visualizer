
import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://kalimatirate.nyure.com.np',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Types
export interface Vegetable {
  id: number;
  name: string;
  price: number | null;
  updated_at: string;
  scrape_date?: string;
  // Add any other fields that your API returns
}

// API functions
export const getVegetables = async (): Promise<Vegetable[]> => {
  try {
    const response = await api.get('/api/vegetables/');
    console.log('API response:', response.data);
    
    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    // Check if response.data is an object with results
    if (response.data && typeof response.data === 'object') {
      // Django REST framework typically uses 'results' for paginated data
      if (Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      // Check for other common patterns
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      if (Array.isArray(response.data.vegetables)) {
        return response.data.vegetables;
      }
      
      // If it's the root object itself and has expected properties of a vegetable
      if (response.data.id && response.data.name) {
        return [response.data];
      }
      
      // If response.data has keys that could be vegetable IDs
      const potentialVegetableArray = Object.values(response.data);
      if (potentialVegetableArray.length > 0 && 
          typeof potentialVegetableArray[0] === 'object' && 
          potentialVegetableArray[0].name) {
        return potentialVegetableArray as Vegetable[];
      }
    }
    
    console.error('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    throw error;
  }
};

export default api;
