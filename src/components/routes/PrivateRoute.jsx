import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import RedirectRoute from "./RedirectRoute";

export default function PrivateRoute() {
  // context
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user"
        /*, {
        headers: {
          Authorization: auth?.token,
        },
      }*/);
      console.log("✅ Current user fetched:", data?.username || data?.email);
      setOk(true);
    } catch (err) {
      console.error("❌ getCurrentUser failed:", err.response?.data || err.message);
      setOk(false);
    }
  };

  return ok ? <Outlet /> : <RedirectRoute />;
}