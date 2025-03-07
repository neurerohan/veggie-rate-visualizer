
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
  price: number;
  updated_at: string;
  // Add any other fields that your API returns
}

// API functions
export const getVegetables = async (): Promise<Vegetable[]> => {
  try {
    const response = await api.get('/api/vegetables/');
    // Check if response.data is an array, otherwise handle appropriately
    // Some APIs wrap the data in an object like { results: [...] }
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && typeof response.data === 'object') {
      // If data is an object, check if it has a results property or similar
      if (Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (Array.isArray(response.data.vegetables)) {
        return response.data.vegetables;
      }
      // If it's an object but doesn't have any of these arrays, log it for debugging
      console.log('API response format:', response.data);
      return [];
    }
    // If all else fails, return an empty array
    return [];
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    throw error;
  }
};

export default api;
