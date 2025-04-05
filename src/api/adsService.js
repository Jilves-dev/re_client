// src/api/adsService.js
import axios from 'axios';
import { API } from '@/config'; // Import API from config.js

// Use the API base URL from config.js
const api = axios.create({
  baseURL: API,
});

// Add interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const getAds = async () => {
  try {
    const response = await api.get('/ads'); // Use relative path since baseURL is set
    return response.data;
  } catch (error) {
    // Error handling is now done by the interceptor
    throw error; // Re-throw the error to be handled by the caller
  }
};

// You can add more API functions here, e.g.,
// export const createAd = async (adData) => { ... };
// export const getAd = async (adId) => { ... };
// ...
