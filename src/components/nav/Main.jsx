import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import useUnreadCount from '../../hooks/useUnreadCount';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useUnreadCount();

  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ad/create') ||
    location.pathname.startsWith('/user/');

  const logout = () => {
    setAuth({ user: null, token: '', refreshToken: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const loggedIn =
    auth?.user !== null && auth?.token !== '' && auth?.refreshToken !== '';

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate('/ad/create');
    } else {
      navigate('/login');
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const bgColor = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const dropdownBg = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const dropdownTextColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const mobileOverlayBg = isDashboard
    ? 'bg-[rgba(251, 233, 208, 0.8)]'
    : 'bg-[rgba(253, 235, 211, 0.8)]';
  const mobileTextColor = isDashboard ? 'text-[#244855]' : 'text-[#244855]';

  // Badge-komponentti — käytetään kaikkialla
  const UnreadBadge = () =>
    unreadCount > 0 ? (
      <span
        className="inline-flex items-center justify-center
          w-5 h-5 ml-1.5 text-xs font-bold
          bg-[#E64833] text-white rounded-full
          leading-none"
      >
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    ) : null;

  return (
    <div
      className={`${bgColor} w-full font-poiretOne !font-medium text-lg px-4 py-2 pb-6`}
      style={{ zIndex: 100000, position: 'relative' }}
    >
      {/* Desktop nav */}
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
            {/* Desktop: käyttäjänimi + badge */}
            <button
              className={`nav-link bg-transparent ${textColor} dropdown-toggle inline-flex items-center`}
              onClick={toggleUserDropdown}
            >
              {auth?.user?.name ? auth.user.name : auth.user.username}
              <UnreadBadge />
            </button>
            {userDropdown && (
              <ul
                className={`absolute mt-2 w-30 right-0 pr-2 pl-2 ${dropdownBg} rounded-b-md shadow-lg z-50`}
              >
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
                  {/* Conversations-linkki badgella */}
                  <NavLink
                    className={`flex items-center px-2 py-2 ${dropdownTextColor}`}
                    to="/user/conversations"
                    onClick={() => setUserDropdown(false)}
                  >
                    Messages
                    <UnreadBadge />
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

      {/* Mobile: hampurilainen + badge sen päällä */}
      <div
        onClick={handleClick}
        className={`md:hidden z-20 ${textColor} relative inline-block`}
        style={{ zIndex: 100002 }}
      >
        {!nav ? <FaBars /> : <FaTimes />}
        {/* Badge hampurilaisen oikeaan yläkulmaan */}
        {!nav && loggedIn && unreadCount > 0 && (
          <span
            className="absolute -top-2 -right-2
              inline-flex items-center justify-center
              w-4 h-4 text-[10px] font-bold
              bg-[#E64833] text-white rounded-full
              leading-none pointer-events-none"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>

      {/* Mobile menu */}
      {nav && (
        <div
          className={`fixed top-0 right-0 w-[65%] max-w-md h-screen ${mobileOverlayBg} backdrop-filter backdrop-blur-md flex flex-col justify-center items-start pl-4`}
          style={{ zIndex: 100001 }}
        >
          <ul
            className={`font-poiretOne ${mobileTextColor} font-normal`}
            style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)' }}
          >
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/" onClick={handleClick}>Home</NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/search" onClick={handleClick}>Search</NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>Buy</NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>Rent</NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>Agents</NavLink>
            </li>
            <li className="py-4 text-4xl">
              <a
                className="nav-link pointer"
                onClick={() => {
                  handlePostAdClick();
                  handleClick();
                }}
              >
                Post Ad
              </a>
            </li>
            {!loggedIn ? (
              <>
                <li className="py-4 text-4xl">
                  <NavLink className="nav-link" to="/login" onClick={handleClick}>Login</NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <NavLink className="nav-link" to="/register" onClick={handleClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className="py-4 text-4xl">
                  {/* Badge Dashboard-linkin viereen — viestit löytyy Sidebarista */}
                  <NavLink
                    className="nav-link inline-flex items-center"
                    to="/dashboard"
                    onClick={handleClick}
                  >
                    Dashboard
                    <UnreadBadge />
                  </NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <a
                    onClick={() => {
                      logout();
                      handleClick();
                    }}
                    className="nav-link"
                  >
                    Logout
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}



/*import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import useUnreadCount from '../../hooks/useUnreadCount';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useUnreadCount();

  // Tarkista, onko käyttäjä dashboard-alueella
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ad/create') ||
    location.pathname.startsWith('/user/');

  const logout = () => {
    setAuth({ user: null, token: '', refreshToken: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const loggedIn =
    auth?.user !== null && auth?.token !== '' && auth?.refreshToken !== '';

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate('/ad/create');
    } else {
      navigate('/login');
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynaamiset värit riippuen siitä, ollaanko dashboardilla
  const bgColor = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const dropdownBg = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const dropdownTextColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const mobileOverlayBg = isDashboard
    ? 'bg-[rgba(251, 233, 208, 0.8)]'
    : 'bg-[rgba(253, 235, 211, 0.8)]';
  const mobileTextColor = isDashboard ? 'text-[#244855]' : 'text-[#244855]';

  // Badge-komponentti — käytetään molemmissa, desktop ja mobile
  const UnreadBadge = () =>
    unreadCount > 0 ? (
      <span
        className="inline-flex items-center justify-center
          w-5 h-5 ml-1.5 text-xs font-bold
          bg-[#E64833] text-white rounded-full
          leading-none"
      >
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    ) : null;

  return (
    <div
      className={`${bgColor} w-full font-poiretOne !font-medium text-lg px-4 py-2 pb-6`}
      style={{ zIndex: 100000, position: 'relative' }}
    >
      <div className={`hidden md:flex justify-between ${textColor}`}>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/search">
          Search
        </NavLink>
        <NavLink className="nav-link" to="/buy">
          Buy
        </NavLink>
        <NavLink className="nav-link" to="/rent">
          Rent
        </NavLink>
        <NavLink className="nav-link" to="/agents">
          Agents
        </NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}>
          Post Ad
        </a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            {/* Desktop: käyttäjänimi + badge *
            <button
              className={`nav-link bg-transparent ${textColor} dropdown-toggle inline-flex items-center`}
              onClick={toggleUserDropdown}
            >
              {auth?.user?.name ? auth.user.name : auth.user.username}
              <UnreadBadge />
            </button>
            {userDropdown && (
              <ul
                className={`absolute mt-2 w-30 right-0 pr-2 pl-2 ${dropdownBg} rounded-b-md shadow-lg z-50`}
              >
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
                  {/* Conversations-linkki badgella dropdownissa *
                  <NavLink
                    className={`flex items-center px-2 py-2 ${dropdownTextColor}`}
                    to="/user/conversations"
                    onClick={() => setUserDropdown(false)}
                  >
                    Messages
                    <UnreadBadge />
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

      {/* Mobile menu toggle *
      <div
        onClick={handleClick}
        className={`md:hidden z-20 ${textColor}`}
        style={{ zIndex: 100002 }}
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu *
      {nav && (
        <div
          className={`fixed top-0 right-0 w-[65%] max-w-md h-screen ${mobileOverlayBg} backdrop-filter backdrop-blur-md flex flex-col justify-center items-start pl-4`}
          style={{ zIndex: 100001 }}
        >
          <ul
            className={`font-poiretOne ${mobileTextColor} font-normal`}
            style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)' }}
          >
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/search" onClick={handleClick}>
                Search
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>
                Buy
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>
                Rent
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>
                Agents
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <a
                className="nav-link pointer"
                onClick={() => {
                  handlePostAdClick();
                  handleClick();
                }}
              >
                Post Ad
              </a>
            </li>
            {!loggedIn ? (
              <>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/dashboard"
                    onClick={handleClick}
                  >
                    Dashboard
                  </NavLink>
                </li>
                {/* Mobile: Messages-linkki badgella 
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link inline-flex items-center"
                    to="/user/conversations"
                    onClick={handleClick}
                  >
                    Messages
                    <UnreadBadge />
                  </NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <a
                    onClick={() => {
                      logout();
                      handleClick();
                    }}
                    className="nav-link"
                  >
                    Logout
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}




import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Tarkista, onko käyttäjä dashboard-alueella
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ad/create') ||
    location.pathname.startsWith('/user/');

  const logout = () => {
    setAuth({ user: null, token: '', refreshToken: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const loggedIn =
    auth?.user !== null && auth?.token !== '' && auth?.refreshToken !== '';

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate('/ad/create');
    } else {
      navigate('/login');
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynaamiset värit riippuen siitä, ollaanko dashboardilla
  const bgColor = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const textColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const dropdownBg = isDashboard ? 'bg-[#FBE9D0]' : 'bg-[#90AEAD]';
  const dropdownTextColor = isDashboard ? 'text-[#244855]' : 'text-[#FBE9D0]';
  const mobileOverlayBg = isDashboard
    ? 'bg-[rgba(251, 233, 208, 0.8)]'
    : 'bg-[rgba(253, 235, 211, 0.8)]';
  const mobileTextColor = isDashboard ? 'text-[#244855]' : 'text-[#244855]';

  return (
    <div
      className={`${bgColor} w-full font-poiretOne !font-medium text-lg px-4 py-2 pb-6`}
      style={{ zIndex: 100000, position: 'relative' }}
    >
      <div className={`hidden md:flex justify-between ${textColor}`}>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/search">
          Search
        </NavLink>
        <NavLink className="nav-link" to="/buy">
          Buy
        </NavLink>
        <NavLink className="nav-link" to="/rent">
          Rent
        </NavLink>
        <NavLink className="nav-link" to="/agents">
          Agents
        </NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}>
          Post Ad
        </a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button
              className={`nav-link bg-transparent ${textColor} dropdown-toggle`}
              onClick={toggleUserDropdown}
            >
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </button>
            {userDropdown && (
              <ul
                className={`absolute mt-2 w-30 right-0 pr-2 pl-2 ${dropdownBg} rounded-b-md shadow-lg z-50`}
              >
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

      {/* Mobile menu toggle *
      <div
        onClick={handleClick}
        className={`md:hidden z-20 ${textColor}`}
        style={{ zIndex: 100002 }}
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu *
      {nav && (
        <div
          className={`fixed top-0 right-0 w-[65%] max-w-md h-screen ${mobileOverlayBg} backdrop-filter backdrop-blur-md flex flex-col justify-center items-start pl-4`}
          style={{ zIndex: 100001 }}
        >
          <ul
            className={`font-poiretOne ${mobileTextColor} font-normal`}
            style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)' }}
          >
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/search" onClick={handleClick}>
                Search
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/buy" onClick={handleClick}>
                Buy
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/rent" onClick={handleClick}>
                Rent
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <NavLink className="nav-link" to="/agents" onClick={handleClick}>
                Agents
              </NavLink>
            </li>
            <li className="py-4 text-4xl">
              <a
                className="nav-link pointer"
                onClick={() => {
                  handlePostAdClick();
                  handleClick();
                }}
              >
                Post Ad
              </a>
            </li>
            {!loggedIn ? (
              <>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className="py-4 text-4xl">
                  <NavLink
                    className="nav-link"
                    to="/dashboard"
                    onClick={handleClick}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="py-4 text-4xl">
                  <a
                    onClick={() => {
                      logout();
                      handleClick();
                    }}
                    className="nav-link"
                  >
                    Logout
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}*/
