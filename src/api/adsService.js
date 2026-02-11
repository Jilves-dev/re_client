// src/api/adsService.js - Improved implementation
import axios from 'axios';
import { API } from '@/config';

// Create an individual instance with the baseURL for these requests
const apiInstance = axios.create({
  baseURL: API,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to ensure headers are set correctly
apiInstance.interceptors.request.use(
  (config) => {
    // Get latest auth from localStorage on each request
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');

    if (auth?.token) {
      config.headers.Authorization = auth.token;
      config.headers.refresh_token = auth.refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Get all ads
export const getAds = async () => {
  try {
    console.log('Fetching ads from:', `${API}/ads`);
    const response = await apiInstance.get('/ads');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ads:', error.message);
    console.error('Error details:', error.response?.data || 'No response data');
    throw error;
  }
};

// Get ads for sell
export const getAdsForSell = async () => {
  try {
    const response = await apiInstance.get('/ads-for-sell');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ads for sell:', error.message);
    throw error;
  }
};

// Get ads for rent
export const getAdsForRent = async () => {
  try {
    const response = await apiInstance.get('/ads-for-rent');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ads for rent:', error.message);
    throw error;
  }
};

// Get ad by slug
export const getAd = async (slug) => {
  try {
    const response = await apiInstance.get(`/ad/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ad with slug ${slug}:`, error.message);
    throw error;
  }
};

// Create an ad
export const createAd = async (adData) => {
  try {
    const response = await apiInstance.post('/ad', adData);
    return response.data;
  } catch (error) {
    console.error('Failed to create ad:', error.message);
    throw error;
  }
};

// Update an ad
export const updateAd = async (id, adData) => {
  try {
    const response = await apiInstance.put(`/ad/${id}`, adData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update ad ${id}:`, error.message);
    throw error;
  }
};

// Delete an ad
export const deleteAd = async (id) => {
  try {
    const response = await apiInstance.delete(`/ad/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete ad ${id}:`, error.message);
    throw error;
  }
};
