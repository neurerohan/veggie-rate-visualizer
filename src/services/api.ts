
import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
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
    return response.data;
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    throw error;
  }
};

export default api;
