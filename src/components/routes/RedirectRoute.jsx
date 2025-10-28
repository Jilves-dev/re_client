import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectRoute() {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h3> {count} </h3>
    </div>
  );
}