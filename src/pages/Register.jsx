import { useState } from "react";
import styles from './Login.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering with:", email);
      setLoading(true);
      const { data } = await axios.post(`/pre-register`, {
        email,
        password,
      });
      console.log("Registration response:", data);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email to complete registration");
        setLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response?.data);
      console.log(err);
      toast.error(err.response?.data?.error || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
     <div className={styles.centerContent}>
     <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
            <h1 className="font-poiretOne">Register</h1>
              <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Enter your email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className={styles.icon}/>
              </div>
              <div className={styles.inputBox}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Choose your password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
              className="absolute inset-y-0 right-12 flex items-center cursor-pointer text-gray-500 hover:text-[#874F41] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
              <FaLock className={styles.icon}/>
              </div>
           <button      
              disabled={loading}
              type="submit"
              className={styles.button}
              >
              {loading ? "Waiting..." : "Register"}
              </button>
              <div className={styles.registerLink}>
              <br></br>
              <p>already have an account?</p>
              <Link className={styles.textlogin} to="/login">
               Go to Login
              </Link>
              </div>
            </form>
          </div>
    </div>
  );
}