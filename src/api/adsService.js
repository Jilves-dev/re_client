import axios from 'axios';
import { API } from '@/config';

// Create a dedicated API instance
const api = axios.create({
  baseURL: API,
});

console.log("adsService initialized with baseURL:", API);

// Add interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error in adsService:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    return Promise.reject(error);
  }
);

export const getAds = async () => {
  try {
    console.log("Getting ads from:", `${API}/ads`);
    // Try with direct URL instead of relative path
    const response = await axios.get(`${API}/ads`);
    console.log("Ads response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ads:', error.message);
    throw error;
  }
};