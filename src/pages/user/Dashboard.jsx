import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";
import Spinner from "../../components/Spinner";

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
  const [loading, setLoading] = useState(true);

useEffect(() => {
    if (auth?.token) {
      fetchAds();
    }
  }, [auth?.token]);
  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user-ads");
      
      console.log("=== DEBUG DASHBOARD ===");
      console.log("Raw response:", data);
      console.log("Type:", typeof data);
      console.log("Is array?", Array.isArray(data));
      console.log("Has .ads?", data?.ads);
      console.log("Length:", data?.length);

// Jos backend palauttaa { ads: [...] }
    if (data.ads && Array.isArray(data.ads)) {
      setAds(data.ads);
    }
    // Jos backend palauttaa suoraan [...]
    else if (Array.isArray(data)) {
      setAds(data);
    }
    // Jos jotain muuta
    else {
      console.error("Unexpected data format:", data);
      setAds([]);
    }
    setLoading(false);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    setAds([]);
    setLoading(false);
  }
};

  // Loading state
  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Dashboard" />
        <Sidebar />
        <Spinner />
      </div>
    );
  }

  // Empty state
  if (!ads?.length) {
    return (
      //<div className='w-full min-h-screen pb-10'>
      <div className='w-full pb-10'>
        <PageHeader title="Dashboard" />
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <div className="text-center px-4">
            <h2 className="font-castoro text-2xl text-[#244855] mb-4">
            Hey {auth.user?.name || auth.user?.username},
            </h2>
             <p className="text-gray-600 mb-6">
            You have not posted any properties yet!
            </p>
            <Link to="/ad/create" 
            className="inline-block px-6 py-3 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg font-castoro transition-colors">
              Create your first property
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Dashboard"/>
        <Sidebar />
        <div className="w-full bg-[#FBE9D0] min-h-screen py-10">
          <div className="flex justify-center w-full">
              <h1 className="font-castoro text-2xl text-[#244855]">
                Total {ads.length} {ads.length === 1 ? 'property' : 'properties'}
              </h1>
          </div>
          
          <div className="grid grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-2 
            xl:grid-cols-3   
            justify-center mb-10 gap-y-10 
            place-items-center 
            px-4 sm:px-8 
            py-10 bg-[#FBE9D0]">
            {ads.map((ad) => (
              <UserAdCard ad={ad} key={ad._id} />
            ))}
          </div>
        </div>
      </div>
  );
}