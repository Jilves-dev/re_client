import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, { email, password });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success('Login successful');
        setLoading(false);
        location?.state !== null
          ? navigate(location.state)
          : navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.centerContent}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1 className="font-poiretOne">Login</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Your username please"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputBox}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-12 flex items-center cursor-pointer text-gray-500 hover:text-[#874F41] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            <FaLock className={styles.icon} />
          </div>

          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link className={styles.textforgot} to="/auth/forgot-password">
              Forgot password
            </Link>
          </div>
          <button disabled={loading} type="submit" className={styles.button}>
            {loading ? 'Waiting...' : 'Login'}
          </button>
          <div className={styles.registerLink}>
            <br></br>
            <p>Dont have an account?</p>
            <Link className={styles.textregister} to="/register">
              Go to register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
