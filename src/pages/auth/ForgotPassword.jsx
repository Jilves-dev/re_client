import { useState } from "react";
import styles from './Login.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    try {
      console.log("Requesting password reset for:", email);
      setLoading(true);
      
      const { data } = await axios.post('/forgot-password', { email });
      
      console.log("Forgot password response:", data);
      
      if (data?.error) {
        toast.error(data.error, {
          duration: 5000,
          position: 'top-center',
          style: { marginTop: '80px' },
        });
      } else {
        toast.success("Please check your email for password reset link", {
          duration: 5000,
          position: 'top-center',
          style: { marginTop: '80px' },
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      console.error("Error response:", err.response?.data);
      
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          "Something went wrong. Try again.";
      
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
        style: { marginTop: '80px' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.centerContent}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <p className="text-center mb-4" style={{ color: '#90AEAD' }}>
            Enter your email to receive a password reset link
          </p>
          
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className={styles.icon}/>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={styles.button}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className={styles.registerLink}>
            <br />
            <Link className={styles.textlogin} to="/login">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}




/*import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email for password reset link");
        setLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-[#FBE9D0] text-[#90AEAD] mx-auto text-center p-5">Forgot password</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                disabled={loading}
                className="btn bg-[#90AEAD] text-white col-12 mb-4"
              >
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>

            <Link className="text-[#E64833]" to="/login">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}*/