import { useEffect, useState } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import UserAdCard from "../../components/cards/UserAdCard";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-decomang text-align:left text-6xl md:text-6xl xl:text-8xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function UserAds() {
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
      setAds(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setAds([]);
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="My Ads"/>
        <Sidebar />
        <Spinner message="Loading your ads..." />
      </div>
    );
  }

  // Empty
  if (!ads?.length) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="My Ads"/>
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center px-4">
            Hey {auth.user?.name || auth.user?.username},
            <br/>
            You have not posted any properties yet!
            <br/>
            <Link to="/ad/create" className="text-[#90AEAD] hover:underline mt-4 inline-block">
              Create your first property
            </Link>
          </h2>
        </div>
      </div>
    );
  }

  // Has data
  return (
    <div className='w-full pb-10'>
      <PageHeader title="My Ads"/>
      <Sidebar />
      
      <div className="flex justify-center py-10">
        <h1 className="font-castoro text-2xl">
          You have {ads.length} {ads.length === 1 ? 'property' : 'properties'}
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
  );
}