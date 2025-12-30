import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import Spinner from "../components/Spinner";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";
//import DebugComponent from "../components/DebugComponent";
import './Home.css';

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-8 pt-10 sm:pt-20 sm:pb-16 md:pt-[100px] md:pb-24 
   bg-[#90AEAD]">
    <h1 className="font-floral pl-8 text-5xl sm:text-7xl 
    text-[#244855] 
    font-normal">
      {title}
    </h1>
  </div>
);

export default function Home() {
  const [auth, setAuth] = useAuth();
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Testaa API yhteys
  const testAPI = async () => {
    try {
      console.log("Testing API connection to:", axios.defaults.baseURL);
      const response = await axios.get("/test");
      console.log("API test successful:", response.data);
    } catch (error) {
      console.error("API test failed:", error);
      console.error("Error details:", error.response?.data);
    }
  };
  
  testAPI();
}, []);

  useEffect(() => {
    fetchAds();
  }, []);

const fetchAds = async () => {
  try {
    setLoading(true);
    console.log("Fetching ads...");
    
    // ✅ Kutsu MOLEMPIA endpointteja erikseen
    const [sellResponse, rentResponse] = await Promise.all([
      axios.get("/ads-for-sell"),
      axios.get("/ads-for-rent")
    ]);
    
    console.log("Sell ads:", sellResponse.data.length);
    console.log("Rent ads:", rentResponse.data.length);
    
    setAdsForSell(sellResponse.data || []);
    setAdsForRent(rentResponse.data || []);
    setLoading(false);
  } catch (error) {
    console.error("❌ API error:", error);
    setAdsForSell([]);
    setAdsForRent([]);
    setLoading(false);
  }
};


  // Näytä spinner kun dataa ladataan
  if (loading) {
    return (
      <div name='home' className='max-w-screen w-full pb-10'>
        <div className="container_bg">
          <div className="search-container">
            <SearchMain />
          </div>
        </div>
        <div name="header" className="w-full">
          <PageHeader title="Space realization app experimental"/>
        </div>
        <Spinner message="Loading properties ..." />
      </div>
    );
  }

  return (
    <div name='home' className='max-w-screen w-full pb-10'>
       <div className="container_bg">
        <div className="search-container">
        <SearchMain />
        </div>
        <br></br>
        <br></br>
        </div>
        <div name="header" className="w-full">
        <PageHeader title="Space realization app experimental"/>
        </div>
        
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FBE9D0] animate-fadeIn">
        {adsForSell && adsForSell.length > 0 ? (
            adsForSell.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">No properties for sale</p>
          )}
        </div>

        <div name="header" className="w-full">
        <PageHeader title="For Rent"/>
        </div>
   
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FBE9D0] animate-fadeIn">
        {adsForRent && adsForRent.length > 0 ? (
            adsForRent.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">No properties for rent</p>
          )}
        </div>
      </div>
  );
}