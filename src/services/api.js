import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://geto-006w.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// API service for fetching data
export const fetchVegetables = async () => {
  try {
    const response = await api.get('/vegetables');
    if (!response.data) {
      throw new Error('No data received from API');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    // Return empty array but also store the error message
    return [];
  }
};

export default api;
