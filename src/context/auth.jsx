// src/context/auth.jsx - KORJATTU VERSIO
import React from 'react';
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });
  
  // Aseta axios baseURL ENNEN kaikkea muuta
  axios.defaults.baseURL = API;
  console.log("AuthProvider: axios baseURL set to:", API);
  
  useEffect(() => {
    // Lataa localStorage
    const fromLS = localStorage.getItem("auth");
    if (fromLS) {
      try {
        const parsed = JSON.parse(fromLS);
        setAuth(parsed);
        
        if (parsed?.token) {
          axios.defaults.headers.common["Authorization"] = parsed.token;
          axios.defaults.headers.common["refresh_token"] = parsed.refreshToken;
        }
      } catch (err) {
        console.error("Failed to parse auth from localStorage:", err);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Päivitä headerit kun auth muuttuu
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
      axios.defaults.headers.common["refresh_token"] = auth.refreshToken;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["refresh_token"];
    }
  }, [auth.token, auth.refreshToken]);

  // Token refresh interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry && auth.refreshToken) {
          originalRequest._retry = true;
          
          try {
            const { data } = await axios.get("/refresh-token");
            
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));
            
            originalRequest.headers["Authorization"] = data.token;
            originalRequest.headers["refresh_token"] = data.refreshToken;
            
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            
            if (refreshError.response?.status === 403) {
              setAuth({ user: null, token: "", refreshToken: "" });
              localStorage.removeItem("auth");
            }
            
            return Promise.reject(error);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [auth.refreshToken]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };






// src/context/auth.jsx - Fixed implementation
/*import React from 'react';
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });
  
  // Initialize axios defaults - this runs only once when component mounts
  useEffect(() => {
    // Explicitly set axios defaults baseURL
    axios.defaults.baseURL = API;
    console.log("AuthProvider initialized with baseURL:", axios.defaults.baseURL);
    
    // Load from localStorage if available
    const fromLS = localStorage.getItem("auth");
    if (fromLS) {
      try {
        const parsed = JSON.parse(fromLS);
        setAuth(parsed);
        
        // Set auth headers immediately if token exists
        if (parsed?.token) {
          axios.defaults.headers.common["Authorization"] = parsed.token;
          axios.defaults.headers.common["refresh_token"] = parsed.refreshToken;
          console.log("Loaded auth from localStorage and set headers");
        }
      } catch (err) {
        console.error("Failed to parse auth from localStorage:", err);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Update axios headers whenever auth changes
  useEffect(() => {
    if (auth?.token) {
      console.log("Setting auth headers with token");
      axios.defaults.headers.common["Authorization"] = auth.token;
      axios.defaults.headers.common["refresh_token"] = auth.refreshToken;
    } else {
      // Clear headers if no token
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["refresh_token"];
    }
  }, [auth.token, auth.refreshToken]);

  // Token refresh interceptor with improved error handling
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        
        // Only attempt refresh if 401 error and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry && auth.refreshToken) {
          originalRequest._retry = true;
          
          try {
            console.log("Attempting token refresh");
            const { data } = await axios.get("/refresh-token");
            
            // Update auth in state and localStorage
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));
            
            // Update headers for the retried request
            originalRequest.headers["Authorization"] = data.token;
            originalRequest.headers["refresh_token"] = data.refreshToken;
            
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            
            // Only clear auth on specific auth errors, not network errors
            if (refreshError.response?.status === 403) {
              console.log("Authentication expired - redirecting to login");
              setAuth({ user: null, token: "", refreshToken: "" });
              localStorage.removeItem("auth");
            }
            
            return Promise.reject(error);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    // Clean up interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [auth.refreshToken]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };*/





/*import React from 'react';
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from '@/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  // Make sure this runs only once and sets axios defaults globally
  useEffect(() => {
    // Explicitly set the axios defaults - VERY IMPORTANT
    axios.defaults.baseURL = API;
    console.log("AuthProvider: axios.defaults.baseURL set to:", axios.defaults.baseURL);

    // Load auth from localStorage if available
    let fromLS = localStorage.getItem("auth");
    if (fromLS) {
      const parsedAuth = JSON.parse(fromLS);
      setAuth(parsedAuth);
      
      // Set auth headers immediately if token exists
      if (parsedAuth?.token) {
        axios.defaults.headers.common["Authorization"] = parsedAuth.token;
        axios.defaults.headers.common["refresh_token"] = parsedAuth.refreshToken;
      }
    }
  }, []);

  useEffect(() => {
    // Debug auth token settings
    if (auth?.token) {
      console.log("Setting auth token in headers:", auth.token.substring(0, 10) + "...");
      axios.defaults.headers.common["Authorization"] = auth.token;
      axios.defaults.headers.common["refresh_token"] = auth.refreshToken;
    } else {
      console.log("No auth token available");
      // Varmistetaan, että oletusasetukset ovat kunnossa
      console.log("Current axios baseURL:", axios.defaults.baseURL);
    }
  }, [auth?.token]); // Tämä hook suoritetaan aina kun auth.token muuttuu


  // Token refresh -logiikka, joka epäonnistuu hiljaisesti
useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      console.log("Axios error:", err.response?.status, err.message);
      
      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            console.log("Trying to refresh token");
            const { data } = await axios.get("/refresh-token");
            console.log("Token refreshed successfully");
            
            axios.defaults.headers.common["Authorization"] = data.token;
            axios.defaults.headers.common["refresh_token"] = data.refreshToken;
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));

            return axios(originalConfig);
          } catch (_error) {
            console.error("Token refresh failed:", _error.response?.status, _error.message);
            // Virheellä ei ole kriittistä vaikutusta, jos käyttäjä ei ole kirjautunut
            console.log("Continuing without authentication");
            
            // Älä hävitä auth-tietoja jos refresh-token epäonnistuu
            // localStorage.removeItem("auth");
            // setAuth({...});
            
            // Jatka lupauksen hylkäämistä normaalisti
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };*/



/*import React from 'react';
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from '@/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    // Set axios default baseURL immediately when component mounts
    if (API) {
      axios.defaults.baseURL = API;
      console.log("AuthProvider: Setting axios baseURL to:", API);
    } else {
      console.error("AuthProvider: API URL is undefined or empty");
    }
    
    // Load auth from localStorage if available
    let fromLS = localStorage.getItem("auth");
    if (fromLS) setAuth(JSON.parse(fromLS));
  }, []);
 
  // Move this inside useEffect with a dependency on auth
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
      axios.defaults.headers.common["refresh_token"] = auth.refreshToken;
      console.log("Set auth headers with token:", auth.token.substring(0, 10) + "...");
    }
  }, [auth]);

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const { data } = await axios.get("/refresh-token");
            axios.defaults.headers.common["token"] = data.token;
            axios.defaults.headers.common["refresh_token"] = data.refreshToken;
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));

            return axios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };*/




/*import React from 'react';
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from '@/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    let fromLS = localStorage.getItem("auth");
    if (fromLS) setAuth(JSON.parse(fromLS));
    
    // Päivitä axios config joka kerta kun komponentti ladataan
    axios.defaults.baseURL = API;
    console.log("Setting axios baseURL to:", API);
  }, []);
 
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const { data } = await axios.get("/refresh-token");
            axios.defaults.headers.common["token"] = data.token;
            axios.defaults.headers.common["refresh_token"] = data.refreshToken;
            setAuth(data);
            localStorage.setItem("auth", JSON.stringify(data));

            return axios(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };*/

