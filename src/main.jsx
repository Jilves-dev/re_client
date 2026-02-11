import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { API } from './config';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configure axios defaults at the earliest possible moment
axios.defaults.baseURL = API;
axios.defaults.timeout = 15000; // 15 sekunnin timeout

// Request interceptor - automaattinen auth token
axios.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor - automaattinen retry
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Retry kerran jos timeout tai network error
    if (!config._retry && (!response || error.code === 'ECONNABORTED')) {
      config._retry = true;
      console.log('🔄 Retrying failed request:', config.url);

      // odota 1 sekuntti ennen uudelleen yritystä
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios(config);
    }

    // 401 = Unauthorized - ohjaa loginiin
    if (response?.status === 401) {
      console.log('🔐 Unauthorized, redirecting to login');
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Log environment information for debugging
console.log('Application Initializing:');
console.log('- Environment:', import.meta.env.MODE);
console.log('- API URL:', API);
console.log('- Axios baseURL:', axios.defaults.baseURL);

// Error handling for the entire application
const handleGlobalError = (event) => {
  console.error('Unhandled error:', event.error || event.reason);

  // You could add analytics tracking or more sophisticated error reporting here

  // Prevent default browser error handling
  event.preventDefault();
};

// Register global error handlers
window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleGlobalError);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
