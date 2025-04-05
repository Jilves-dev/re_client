import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { useState } from 'react';

export default function Sidebart() {
  
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();

  const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Uusi funktio käyttäjän nimen klikkaustapahtumalle
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  return (
    <div className='bg-[#FBE9D0] w-full px-2 py-2 pb-4'>
      <div className="hidden md:flex justify-start gap-6 border-b border-[#874F41]">
      <NavLink className="font-castoro nav-link text-[#244855] bg-[#FBE9D0] !important" to="/dashboard">dashboard</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/wishlist">wishlist</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/Enquiries">enquiries</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/ad/create">create</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-[#244855] !important" to="/user/settings">update password</NavLink>
      </div>
      <br></br>
      {/*<div className='md:hidden z-20 flex items-center border-b border-[#874F41]'>
        <MdOutlineAppSettingsAlt onClick={handleClick} 
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: '[#244855], padding-bottom: '1rem' }} />
        <span onClick={handleClick} className='cursor-pointer font-castoro'>dashboard navigation</span>
      </div>*/}
      {/* Mobiilivalikko */}
      <div className='md:hidden z-20 flex items-center bg-[#FBE9D0] border-b border-[#874F41]'>
        <MdOutlineAppSettingsAlt 
          onClick={handleClick} 
          style={{ 
            width: '2.5rem', 
            height: '2.5rem', 
            marginRight: '0.5rem', 
            color: '#874F41', 
            paddingBottom: '1rem' 
          }} 
        />
       {/* <div style={{ height: '1rem' }}></div>*/ }
        <span onClick={handleClick} className='cursor-pointer font-castoro text-[#874F41] mb-2'>dashboard navigation</span>
      </div>
      {nav && (
              <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
              <ul className='font-castoro text-[#E64833]'>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/user/wishlist" onClick={handleClick}>Wishlist</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/user/Enquiries" onClick={handleClick}>Enquiries</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/ad/create" onClick={handleClick}>Create</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/user/profile" onClick={handleClick}>Profile</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link" to="/user/settings" onClick={handleClick}>Update password</NavLink>
                </li>            
              </ul>
            </div>
      )}
    </div>
  );
}



