import React from 'react';
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

export { useAuth, AuthProvider };




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

