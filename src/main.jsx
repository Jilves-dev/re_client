import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { API } from './config';
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configure axios defaults at the earliest possible moment
axios.defaults.baseURL = API;

// Log environment information for debugging
console.log("Application Initializing:");
console.log("- Environment:", import.meta.env.MODE);
console.log("- API URL:", API);
console.log("- Axios baseURL:", axios.defaults.baseURL);

// Error handling for the entire application
const handleGlobalError = (event) => {
  console.error("Unhandled error:", event.error || event.reason);
  
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

/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/auth';
import { API } from './config';

// Force API to be loaded early and logged
console.log("Main.jsx: API configured as:", API);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);*/

/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );*/

