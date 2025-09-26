import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { MdEmail } from "react-icons/md";
export default function ContactSeller({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    if (loggedIn) {
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setPhone(auth.user?.phone);
    }
  }, [loggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      toast.error("You must be logged in to contact the seller");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/contact-seller", {
        name,
        email,
        message,
        phone,
        adId: ad._id,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Your enquiry has been emailed to the seller");
        setMessage("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#FBE9D0] py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl text-center mb-6">
          Please contact {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username}
          <MdEmail style={{ fontSize: 28, color: '#90AEAD', display: 'inline-block', verticalAlign: 'middle' }} />
          </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="message"
            className="form-textarea w-full p-3 border rounded-lg"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus={true}
            disabled={!loggedIn}
            rows={4}
          ></textarea>

          <input
            type="text"
            className="form-input w-full p-3 border rounded-lg"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!loggedIn}
          />

          <input
            type="text"
            className="form-input w-full p-3 border rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!loggedIn}
          />

          <input
            type="text"
            className="form-input w-full p-3 border rounded-lg"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!loggedIn}
          />

          {loggedIn ? (
            <button
              className="bg-[#cbc385] border-2 border-[#E64833]  hover:bg-[#cf8c60] text-[#879c7d]  py-2 px-4 rounded w-full"
              type="submit"
              disabled={!name || !email || loading}
            >
              {loading ? "Please wait" : "Send enquiry"}
            </button>
          ) : (
            <button
              className="bg-[#FBE9D0] border-2 border-[#90AEAD] hover:bg-[#cf8c60] text-[#879c7d]  py-2 px-4 rounded w-full"
              type="button"
              onClick={handleLoginRedirect}
              /*style={{ 
                border: "2px solid #E64833 !important", 
                borderRadius: "40px !important", // Korjattu radius -> borderRadius
                cursor: "pointer !important",
              }}*/
            >
              Login to send enquiry
            </button>
          )}
        </form>
      </div>
    </div>
  );
}




