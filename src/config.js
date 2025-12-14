
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

console.log("API configured as:", API);
console.log("Google Places Key exists:", !!GOOGLE_PLACES_KEY);






// src/config.js - Improved implementation

// Get the API URL from environment or use a fallback
//let apiUrl = import.meta.env.VITE_API;

// Fallback mechanism for Vercel production
/*if (!apiUrl && typeof window !== 'undefined') {
  // Auto-detect domain and use it to construct API URL in production
  const isProduction = window.location.hostname !== 'localhost';
  
  if (isProduction) {
    apiUrl = 'https://re-server-tau.vercel.app/api';
  } else {
    apiUrl = 'http://localhost:8000/api';
  }
}

export const API = apiUrl;

// Debug logging during initialization
console.log(`API configured as: ${API}`);

// Export a helper to validate connection
export const validateApiConnection = async () => {
  try {
    const response = await fetch(`${API}/test`);
    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Connection successful',
      data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};*/




/*export const API = import.meta.env.VITE_API || 'https://re-server-tau.vercel.app/api';
console.log("API URL loaded in config:", API);*/

/*export const API = import.meta.env.VITE_API;
console.log("API URL:", API);*/
