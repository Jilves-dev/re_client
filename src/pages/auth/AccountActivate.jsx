import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function AccountActivate() {
  const [auth, setAuth] = useAuth();
  const { token } = useParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && !processing) {
      requestActivation();
    }
  }, [token]);

  const requestActivation = async () => {
    if (processing) return;
    
    try {
      setProcessing(true);
      console.log("Activating account with token:", token.substring(0, 20) + "...");
      
      const { data } = await axios.post('/register', { token });
      
      console.log("Activation response:", data);
      
      if (data?.error) {
        console.error("Activation error:", data.error);
        setError(data.error);
        toast.error(data.error, {
          duration: 5000,
          position: 'top-center',
          style: {
            marginTop: '80px', // Lisää marginaalia yläpalkkiin
          },
        });
        
        if (data.error.includes("already registered")) {
          setTimeout(() => navigate("/login"), 3000);
        } else if (data.error.includes("invalid") || data.error.includes("expired")) {
          setTimeout(() => navigate("/register"), 3000);
        }
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        
        toast.success("Successfully registered and logged in. Welcome!", {
          duration: 4000,
          position: 'top-center',
          style: {
            marginTop: '80px',
          },
        });
        
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error("Activation request failed:", err);
      console.error("Error response:", err.response?.data);
      
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          "Activation failed. Please try again.";
      
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
        style: {
          marginTop: '80px',
        },
      });
      
      setTimeout(() => navigate("/register"), 3000);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5">
        {processing && (
          <>
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h2>Activating your account...</h2>
            <p className="text-muted">Please wait a moment</p>
          </>
        )}
        
        {error && !processing && (
          <>
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Activation Failed</h4>
              <p>{error}</p>
            </div>
            <p className="text-muted">Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
}





/*import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function AccountActivate() {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const { data } = await axios.post(`/register`, { token });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // save in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        // save in context
        setAuth(data);
        toast.success("Successfully logged in. Welcome to free property realization marketplace.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
}*/