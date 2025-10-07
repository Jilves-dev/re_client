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

  useEffect(() => {
    if (token && !processing) {
      requestActivation();
    }
  }, [token]);

  const requestActivation = async () => {
    if (processing) return; // Estä duplikaatti-pyyntö
    
    try {
      setProcessing(true);
      const { data } = await axios.post(`/register`, { token });
      
      if (data?.error) {
        toast.error(data.error);
        
        // Jos käyttäjä on jo olemassa, ohjaa kirjautumissivulle
        if (data.error.includes("already registered")) {
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        // Tallenna auth
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        
        toast.success("Successfully registered and logged in. Welcome!");
        navigate("/");
      }
    } catch (err) {
      console.log("Activation error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      {processing ? "Activating your account..." : "Please wait..."}
    </div>
  );
}




/*import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function AccessAccount() {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestAccess();
  }, [token]);

  const requestAccess = async () => {
    try {
      const { data } = await axios.post(`/access-account`, {
        resetCode: token,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // save in local storage
        localStorage.setItem("auth", JSON.stringify(data));
        // save in context
        setAuth(data);
        toast.success("Please update your password in profile page");
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
      please wait...
    </div>
  );
}*/