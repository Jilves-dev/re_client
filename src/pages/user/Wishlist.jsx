import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Wishlist() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Aluksi TRUE

  useEffect(() => {
    if (auth.token) {
      fetchAds();
    }
  }, [auth.token]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/wishlist');
      setAds(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setAds([]);
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="Wishlist"/>
        <Sidebar />
         <Spinner message="Loading your wishlist ..." />
      </div>
    );
  }

  // EMPTY
  if (!ads?.length) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="Wishlist"/>
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center px-4">
            Hey {auth.user?.name || auth.user?.username},
            <br/>
            You have not liked any properties yet!
          </h2>
        </div>
      </div>
    );
  }

  // HAS DATA
  return (
    <div className='w-full pb-10'>
      <PageHeader title="Wishlist"/>
      <Sidebar />
      
      <div className="flex justify-center py-10">
        <h1 className="font-castoro text-2xl">
          You have liked {ads.length} {ads.length === 1 ? 'property' : 'properties'}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FBE9D0] animate-fadeIn">
        {ads.map((ad) => (
          <AdCard ad={ad} key={ad._id} />
        ))}
      </div>
    </div>
  );
}