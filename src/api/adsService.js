import axios from 'axios';
import { API } from '@/config';

console.log("adsService initialized with API:", API);

// Create an individual instance with the baseURL for these requests
const apiInstance = axios.create({
  baseURL: API,
});

export const getAds = async () => {
  try {
    console.log("Getting ads from URL:", `${API}/ads`);
    
    // Try three different approaches to handle potential routing issues
    try {
      // Approach 1: Using our API instance
      const response = await apiInstance.get('/ads');
      console.log("Ads response received from apiInstance:", response.data);
      return response.data;
    } catch (error) {
      console.log("Approach 1 failed, trying approach 2");
      
      // Approach 2: Using global axios with API url
      const response = await axios.get(`${API}/ads`);
      console.log("Ads response received from axios with full URL:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Failed to fetch ads:', error.message);
    console.error('Error details:', error.response?.data || 'No response data');
    
    // Approach 3: Last resort - try without /api prefix
    try {
      const serverBaseUrl = API.replace('/api', '');
      console.log("Trying last resort URL:", `${serverBaseUrl}/ads`);
      const response = await axios.get(`${serverBaseUrl}/ads`);
      console.log("Success with last resort URL!");
      return response.data;
    } catch (lastError) {
      console.error('All approaches failed');
      throw error;
    }
  }
};