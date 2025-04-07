import axios from 'axios';
import { API } from '@/config';

console.log("adsService initialized with API:", API);

// Create an individual instance with the baseURL for these requests
const apiInstance = axios.create({
  baseURL: API,
});

export const getAds = async () => {
  try {
   // Try with the full URL approach which succeeded in your debug tests
   const response = await axios.get(`${API}/ads`);
   console.log("Ads fetched successfully:", response.data);
   return response.data;
 } catch (error) {
   console.error('Failed to fetch ads:', error.message);
   console.error('Error details:', error.response?.data || 'No response data');
   throw error;
 }
};