import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../components/nav/Sidebar";
import ProfileUpload from "../../components/forms/ProfileUpload";
//import oldDam2 from "../../assets/old_dam2.jpg"; 

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-6">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

/*const PageHeader = ({ title }) => (
  <div
    className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20"
    style={{
      backgroundImage: `url(${oldDam2})`,
      backgroundSize: "cover", // Varmistetaan että kuva peittää koko taustan
      backgroundPosition: "center", // Keskitetään kuva
      backgroundRepeat: "no-repeat", // Estetään kuvan toistuminen
    }}
  >
    <div className="flex items-center pl-6">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833] relative z-10">
        {title}
      </h1>
    </div>
    <div className="absolute inset-0 bg-black opacity-30"></div>
  </div>
);*/

export default function Profile() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user?.username);
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.address);
      setAbout(auth.user?.about);
      setPhoto(auth.user?.photo);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-profile", {
        username,
        name,
        email,
        company,
        address,
        phone,
        about,
        photo,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Profile updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

<div name="header">
        <PageHeader title="Your profile"/>
      </div>
        <Sidebar />
        <div className="container mt-2">
          <div className="row w-full">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <ProfileUpload
                photo={photo}
                setPhoto={setPhoto}
                uploading={uploading}
                setUploading={setUploading}
              />
              <br></br>
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  username
                </label>
                <input
                id="username"
                  type="text"
                  placeholder="Update your username"
                  className="form-control font-castoro text-[#874F41]"
                  value={username}
                  onChange={(e) =>
                    setUsername(slugify(e.target.value.toLowerCase()))
                  }
                />
                </div>
                <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  name
                </label>
                <input
                 id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                </div>
                 <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  email
                </label>
                <input
                 id="email"
                  type="email"
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={email}
                  disabled={true}
                />
                </div>
                 <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  company name
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                </div>
                 <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="enter your address"
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                </div>
                 <div className="mb-4">
                <label htmlFor="username" 
                className="font-castoro block text-[#874F41] mb-2">
                  phone number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="enter your phone"
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                 <div className="mb-4">
              <label htmlFor="username" className="font-castoro block text-[#874F41] mb-2">
                  something about yourself
                </label>
                <textarea
                  id="about"
                  placeholder="write something interesting about yourself.."
                  className="form-control mb-4 font-castoro text-[#874F41]"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={200}
                />
                </div>
         
                         <button
                          className="!bg-[#FBE9D0] hover:bg-[#cf8c60] !text-[#E64833] 
                          font-castoro py-2 px-4 rounded !border 2px border-[#874F41] col-12"
                        >
                          {loading ? "processing" : "update profile"}
                        </button>
                
              </form>
              <br></br><br></br><br></br>    
              </div>
          </div>
        </div>
     
    </>
  );
}