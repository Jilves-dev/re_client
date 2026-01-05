import { NavLink, useNavigate } from "react-router-dom";
import { GiSettingsKnobs } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { useState } from 'react';

export default function Sidebar() {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!nav) {
      // Avataan: pyörähdä 90deg
      setRotation(90);
      setNav(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Suljetaan: pyörähdä 450deg vastapäivään
      setRotation(-360);
       // Odota animaatio loppuun ennen sulkemista
      setTimeout(() => {
        setNav(false);
        document.body.style.overflow = 'auto';
        setRotation(0);
       }, 600);
      } 
    };

    const handleNavLinkClick = (e, path) => {
    e.preventDefault(); // Estä välitön navigointi
    
    // Aloita sulkemisanimaatio
    setRotation(-360);
    
    // Odota animaatio, sitten navigoi ja sulje
    setTimeout(() => {
      setNav(false);
      document.body.style.overflow = 'auto';
      setRotation(0);
      navigate(path);
    }, 600);
  };

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className='bg-[#FBE9D0] w-full px-2 py-2 pb-4'>
      <div className="hidden md:flex justify-start gap-6 border-b border-[#874F41] font-poiretOne text-lg">
        <NavLink className="nav-link text-[#244855] bg-[#FBE9D0] !important" to="/dashboard">🔮 dashboard</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/wishlist">💖 wishlist</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/conversations">📫 Conversations</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/ad/create">🎨 create</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/analytics">📊 Analytics</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/profile">🤵 profile</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/settings">🔝 update password</NavLink>
      </div>
      <br></br>
      
      {/*-------- Mobiilivalikko -----*/}
      <div className='md:hidden z-20 flex items-center bg-[#FBE9D0] border-b border-[#874F41]'>
        {!nav ? (
          <>
            <GiSettingsKnobs 
              onClick={handleClick} 
              style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                marginRight: '0.5rem', 
                color: '#874F41', 
                paddingBottom: '1rem',
                transform: `rotate(${rotation}deg)`,
                transition: rotation === 0 ? 'none' : 'transform 0.6s ease, color 0.3s ease'
              }} 
              className="cursor-pointer"
            />
            <span onClick={handleClick} className='cursor-pointer font-poiretOne text-lg text-[#874F41] mb-2'>
              DashboardNavigatioN
            </span>
          </>
        ) : (
          <>
            <GiSettingsKnobs 
              onClick={handleClick}
              style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                marginRight: '0.5rem',
                color: '#E64833', 
                paddingBottom: '1rem',
                marginBottom: '0.8rem',
                transform: `rotate(${rotation}deg)`,
                transition: rotation === 0 ? 'none' : 'transform 0.6s ease, color 0.3s ease'
              }}
              className="cursor-pointer hover:text-[#874F41] transition-colors"
            />
            <span onClick={handleClick} className='cursor-pointer font-poiretOne text-lg text-[#E64833] mb-2 hover:text-[#874F41] transition-colors'>
              closeMenu 
            </span>
          </>
        )}
      </div>

      {nav && (
        <div className='fixed top-0 right-0 w-[65%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] 
        backdrop-filter backdrop-blur-md flex flex-col justify-center items-start pl-4 z-50'>
          <ul 
            className='font-poiretOne text-[#E64833]'
            style={{ textShadow: '0 0 6px rgba(36, 72, 85, 0.6)' }}
          >
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/dashboard')}>Dashboard</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/user/wishlist')}>Wishlist</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/user/conversations')}>Messages</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/ad/create')}>Create post</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/user/analytics')}>Analytics</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/user/profile')}>Profile</a>
            </li>
            <li className='py-4 text-4xl'>
              <a className="nav-link cursor-pointer" onClick={(e) => handleNavLinkClick(e, '/user/settings')}>Update password</a>
            </li>            
          </ul>
        </div>
      )}
    </div>
  );
}