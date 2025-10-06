import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tarkista, onko käyttäjä dashboard-alueella
  const isDashboard = location.pathname.startsWith('/dashboard') || 
                      location.pathname.startsWith('/ad/create') ||
                      location.pathname.startsWith('/user/');

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn = auth?.user !== null && auth?.token !== "" && auth?.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    setNav(!nav);
    if (window.innerWidth < 768) {
      document.body.style.overflow = !nav ? 'hidden' : 'auto';
    }
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setUserDropdown(!userDropdown);
  };

  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynaamiset värit riippuen siitä, ollaanko dashboardilla
  const bgColor = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#244855]' : 'text-[#FFFFFF]';
  const dropdownBg = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const dropdownTextColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const mobileOverlayBg = isDashboard ? 'bg-[rgba(251, 233, 208, 0.8)]' : 'bg-[rgba(253, 235, 211, 0.8)]';
  const mobileTextColor = isDashboard ? 'text-[#244855]' : 'text-[#244855]';

  return (
    <div className={`${bgColor} w-full font-castoro font-light px-4 py-2 pb-6`} style={{ zIndex: 100000, position: 'relative' }}>
      <div className={`hidden md:flex justify-between ${textColor}`}>
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/search">Search</NavLink>
        <NavLink className="nav-link" to="/buy">Buy</NavLink>
        <NavLink className="nav-link" to="/rent">Rent</NavLink>
        <NavLink className="nav-link" to="/agents">Agents</NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}>Post Ad</a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button 
              className={`nav-link bg-transparent ${textColor} dropdown-toggle`}
              onClick={toggleUserDropdown}>
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </button>
            {userDropdown && (
              <ul className={`absolute mt-2 w-40 right-0 ${dropdownBg} rounded-md shadow-lg z-50`}>
                <li>
                  <NavLink
                    className={`block px-2 py-2 ${dropdownTextColor}`}
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <a
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className={`block px-2 py-2 ${dropdownTextColor}`}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile menu toggle */}
      <div onClick={handleClick} className={`md:hidden z-20 ${textColor}`} style={{ zIndex: 100002 }}>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      
      {/* Mobile menu */}
      {nav && (
        <div 
          className={`fixed top-0 right-0 w-[60%] max-w-md h-screen ${mobileOverlayBg} backdrop-filter backdrop-blur-md flex flex-col justify-center items-center`}
          style={{ zIndex: 100001 }}
        >
          <ul className={`font-castoro ${mobileTextColor} font-normal`}>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/search" onClick={handleClick}>Search</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>Buy</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>Rent</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>Agents</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <a className="nav-link pointer" onClick={() => { handlePostAdClick(); handleClick(); }}>Post Ad</a>
            </li>
            {!loggedIn ? (
              <>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/login" onClick={handleClick}>Login</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/register" onClick={handleClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <a onClick={() => { logout(); handleClick(); }} className="nav-link">Logout</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}



{/*import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn = auth?.user !== null && auth?.token !== "" && auth?.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    setNav(!nav);
    if (window.innerWidth < 768) { // Check if in mobile view
      document.body.style.overflow = !nav ? 'hidden' : 'auto';
    }
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    setUserDropdown(!userDropdown);
  };

  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-[#90AEAD] w-full font-castoro font-light px-4 py-2 pb-6' style={{ zIndex: 100000, position: 'relative' }}>
      <div className="hidden md:flex justify-between text-[#FFFFFF]">
        -- Linkit --
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/search">Search</NavLink>
        <NavLink className="nav-link" to="/buy">Buy</NavLink>
        <NavLink className="nav-link" to="/rent">Rent</NavLink>
        <NavLink className="nav-link" to="/agents">Agents</NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}>Post Ad</a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button 
            className="nav-link bg-transparent text-[#FFFFFF] dropdown-toggle" 
            onClick={toggleUserDropdown}>
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </button>
            {userDropdown && (
                <ul className="absolute mt-2 w-40 right-0 bg-[#90AEAD] rounded-md shadow-lg z-50">
                <li>
                  <NavLink
                    className="block px-2 py-2 text-[#FBE9D0]"
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <a
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className="block px-2 py-2 text-[#FBE9D0]"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <div onClick={handleClick} className='md:hidden z-20' style={{ zIndex: 100002 }}>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      ----- Mobiilivalikko - KORJATTU ----
      {nav && (
        <div 
          className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center'
          style={{ zIndex: 100001 }}
        >
          <ul className='font-castoro text-[#244855] font-normal'>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/search" onClick={handleClick}>Search</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>Buy</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>Rent</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>Agents</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <a className="nav-link pointer" onClick={() => { handlePostAdClick(); handleClick(); }}>Post Ad</a>
            </li>
            {!loggedIn ? (
              <>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/login" onClick={handleClick}>Login</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/register" onClick={handleClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <a onClick={() => { logout(); handleClick(); }} className="nav-link">Logout</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}*/}





{/*import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();
  

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  //const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";
  
  const loggedIn = auth?.user !== null && auth?.token !== "" && auth?.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  /*const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };*/

  /*const handleClick = () => {
    setNav(!nav);
    if (window.innerWidth < 768) { // Check if in mobile view
      document.body.style.overflow = !nav ? 'hidden' : 'auto';
    }
  };

  // Uusi funktio käyttäjän nimen klikkaustapahtumalle
  /*const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };*/

 /* const toggleUserDropdown = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    setUserDropdown(!userDropdown);
  };

  const userDropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className='bg-[#90AEAD] w-full font-castoro font-light px-4 py-2 pb-6'>
      <div className="hidden md:flex justify-between text-[#FFFFFF]">
        {/* Linkit  #F5F5F5  */}
       /* <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/search">Search</NavLink>
        <NavLink className="nav-link" to="/buy">Buy</NavLink>
        <NavLink className="nav-link" to="/rent">Rent</NavLink>
        <NavLink className="nav-link" to="/agents">Agents</NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}>Post Ad</a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button 
            className="nav-link bg-transparent text-[#FFFFFF] dropdown-toggle" 
            onClick={toggleUserDropdown}>
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </button>
            {userDropdown && ( // Käyttäen userDropdown tilaa
                <ul className="absolute mt-2 w-40 right-0 bg-[#90AEAD] rounded-md shadow-lg z-50">
                <li>
                  <NavLink
                    className="block px-2 py-2 text-[#FBE9D0]"
                    //hover:bg-[#FBE9D0]
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)} // Sulkee valikon klikkauksen jälkeen
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <a
                    onClick={() => {
                      logout();
                      setUserDropdown(false); // Sulkee valikon klikkauksen jälkeen
                    }}
                    className="block px-2 py-2 text-[#FBE9D0]"
                    //hover:bg-[#FBE9D0]
                  >
                    Logout
                  </a>
                </li>
              </ul>

            )}
          </div>
        )}
      </div>
      <div onClick={handleClick} className='md:hidden z-20'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobiilivalikko */
    /*  {nav && (
        <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-5000'>
          <ul className='font-castoro text-[#244855] font-normal'>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/search" onClick={handleClick}>Search</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>Buy</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>Rent</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>Agents</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <a className="nav-link pointer" onClick={() => { handlePostAdClick(); handleClick(); }}>Post Ad</a>
            </li>
            {!loggedIn ? (
              <>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/login" onClick={handleClick}>Login</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/register" onClick={handleClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <a onClick={() => { logout(); handleClick(); }} className="nav-link">Logout</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}*/

