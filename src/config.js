// config.js
export const API = 
  import.meta.env.MODE === 'production' 
    ? 'https://server-beryl-rho.vercel.app/api'
    : 'http://localhost:8000/api';


//export const API = import.meta.env.VITE_API;
//console.log("API URL:", API); 

// Tämä näyttää, mikä API-osoite on käytössä https://greenserver.vercel.app/api