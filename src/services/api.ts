import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://geto-006w.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Types
export interface Vegetable {
  id: number;
  name: string;
  name_nepali: string;
  unit: string;
  min_price: string | number;
  max_price: string | number;
  avg_price: string | number;
  scrape_date: string;
  price?: number | null;
  updated_at?: string;
}

// API service for fetching data
export const fetchVegetables = async () => {
  try {
    // This would normally fetch from an API
    // Placeholder implementation returning an empty array
    return [];
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    throw error;
  }
};


export default api;