import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

export default function RedirectRoute() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    // Redirect once count is equal to 0
    count === 0 && navigate('/');

    // Cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBE9D0]">
      <div className="text-center">
        <Spinner message={`Redirecting in ${count}...`} />
      </div>
    </div>
  );
}
