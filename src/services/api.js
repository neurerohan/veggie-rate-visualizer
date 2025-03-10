import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://geto-006w.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// API service for fetching data
export const fetchVegetables = async () => {
  try {
    console.log('Fetching from:', api.defaults.baseURL);
    const response = await api.get('vegetables/');
    console.log('API Response:', response.data);
    
    if (!response.data || !response.data.results) {
      throw new Error('No data received from API');
    }
    return response.data.results;
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from API. Please check if the API is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export default api;
