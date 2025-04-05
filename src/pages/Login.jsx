import { useState } from 'react'
import styles from './Login.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login successful");
        setLoading(false);
        location?.state !== null ? navigate(location.state) : navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.centerContent}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input 
              type="text"
              placeholder="Your username please"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.inputBox}>
            <input 
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon}/>
          </div>

          <div className={styles.rememberForgot}>
            <label><input type="checkbox" />Remember me</label>
            <Link className={styles.textforgot} to="/auth/forgot-password">Forgot password</Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className={styles.button}
          >
            {loading ? "Waiting..." : "Login"}
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





/*import { useState } from 'react'
import styles from './Login.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"


const Login = () => {
const [auth, setAuth] = useAuth();
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
// const { error, login } = useLogin()
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(email, password);
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login successful");
        setLoading(false);
        location?.state !== null
          ? navigate(location.state)
          : navigate("/dashboard");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className={styles.center-content}>
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
      <h1>
        Login
      </h1>
      <div className={styles.input-box}>
        <input 
        type="text"
        placeholder="Your username please"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
        <FaUser className="icon"/>
      </div>

      <div className={styles.input-box}>
        <input 
        type="password"
        placeholder="Password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />
        <FaLock className="icon"/>
      </div>

      <div className={styles.remember-forgot}>
        <label><input type="checkbox" />Remember me </label>
     
        <Link className={styles.text-gray-500} to="/auth/forgot-password">
              Forgot password
            </Link>

        <br></br><br></br>
      </div>

      <button      
      disabled={loading}
      type="submit"
      className={`${styles.wrapper} ${styles.button}`}
      >
      {loading ? "Waiting..." : "Login"}
      </button>

      <div className={styles.register-link}>
      <br></br>
        <p>Dont have an account?</p>

        <Link className="text-gray-500" to="/register">
          Go to register
        </Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login*/