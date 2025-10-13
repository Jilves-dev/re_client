/*import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
//import { FaTimes } from "react-icons/fa"; // Sulje-ikoni

export default function Sidebar() {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button - Desktop (vasen yläkulma) 
      <button
        onClick={toggleSidebar}
        className="fixed top-32 left-4 z-50 bg-[#90AEAD] text-white p-3 rounded-full shadow-lg hover:bg-[#7a9a99] transition-colors hidden md:block"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      * Hamburger button - Mobile (oikea yläkulma) 
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 bg-[#90AEAD] text-white p-3 rounded-full shadow-lg hover:bg-[#7a9a99] transition-colors md:hidden"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>*

      * Overlay - klikkaamalla sulkee 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      * Sidebar *
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#FBE9D0] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        * ✅ SULJE-NAPPI VASEMMASSA YLÄKULMASSA *
        <button
          onClick={closeSidebar}
          className="absolute top-4 left-4 text-[#244855] hover:text-[#E64833] transition-colors p-2"
          aria-label="Close sidebar"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        * Sidebar content *
        <div className="flex flex-col h-full pt-16 pb-6">
          * User info *
          <div className="px-6 mb-6">
            <h2 className="text-xl font-castoro text-[#244855] mb-2">
              {auth?.user?.name || auth?.user?.username || "User"}
            </h2>
            <p className="text-sm text-[#874F41]">
              {auth?.user?.email}
            </p>
          </div>

          * Navigation links *
          <nav className="flex-1 px-4 space-y-2">
            <NavLink
              to="/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/ad/create"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              Create Ad
            </NavLink>

            <NavLink
              to="/user/ads"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              My Ads
            </NavLink>

            <NavLink
              to="/user/wishlist"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/user/enquiries"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              Enquiries
            </NavLink>

            <NavLink
              to="/user/profile"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors font-castoro ${
                  isActive
                    ? "bg-[#90AEAD] text-white"
                    : "text-[#244855] hover:bg-[#90AEAD] hover:text-white"
                }`
              }
            >
              Profile
            </NavLink>
          </nav>

          * Logout button 
          <div className="px-4 mt-auto">
            <button
              onClick={() => {
                setAuth({ user: null, token: "", refreshToken: "" });
                localStorage.removeItem("auth");
                closeSidebar();
                window.location.href = "/";
              }}
              className="w-full px-4 py-3 bg-[#E64833] hover:bg-[#d43d25] text-white rounded-lg transition-colors font-castoro"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}*/




import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";
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

export default function Dashboard() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const seller = auth.user?.role?.includes("Seller");

  useEffect(() => {
    fetchAds(3);
  }, [auth.token !== "", page]);

  useEffect(() => {
    if (page === 1) return;
    fetchAds();
  }, [page]);

  const fetchAds = async (itemsPerPage = 3) => {
    try {
      const { data } = await axios.get(`/user-ads/${page}?limit=${itemsPerPage}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full pb-6'>
      <div name="header">
        <PageHeader title="Dashboard"/>
      </div>
      <Sidebar />
      {!seller ? (
        <div className="flex justify-center items-center text-center">
          <h2 className="flex justify-center py-10 font-castoro">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            Welcome to property realization marketplace App!
          </h2>
        </div>
      ) : (
        <>
        <div className="flex justify-center py-10">
          <h1 className="font-castoro text-[#244855] text-center"> {`total ${total} ads found`} </h1>
          </div>
            <div className="grid grid-cols-1 
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  xl:grid-cols-3   
                  justify-center mb-10 gap-y-10 
                  place-items-center 
                  px-4 sm:px-8 
                  py-10 bg-[#FBE9D0] animate-fadeIn">
                    {ads?.map((ad) => (
                      <UserAdCard 
                      ad={ad} 
                      key={ad._id} 
                      />
                    ))}
                  </div>

                  {ads?.length < total && (
                    <div className="flex justify-center mt-4 mb-4">
                      <button
                        disabled={loading}
                        className="bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] font-yeseva-one-regular py-2 px-4 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                {loading ? "Loading..." : `${ads?.length} / ${total} Load more`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}



