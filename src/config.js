let apiUrl = import.meta.env.VITE_API;

// Fallback jos env ei toimi
if (!apiUrl) {
  if (typeof window !== 'undefined') {
    const isProduction = window.location.hostname !== 'localhost';

    if (isProduction) {
      apiUrl = 'https://api.spacerealizationapp.fi/api';
    } else {
      apiUrl = 'http://localhost:8000/api';
    }
  } else {
    apiUrl = 'http://localhost:8000/api';
  }
}

export const API = apiUrl;

export const GOOGLE_PLACES_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY || '';

console.log('API configured as:', API);
console.log('Google Places Key exists:', !!GOOGLE_PLACES_KEY);
