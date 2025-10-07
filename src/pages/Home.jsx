import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";
//import { GiSoapExperiment } from "react-icons/gi";
//import DebugComponent from "../components/DebugComponent";
import './Home.css';

/*const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-left pt-10 pb-8 sm:pt-20 sm:pb-16 md:pt-[100px] md:pb-24 bg-[#90AEAD]" 
       style={{ zIndex: 1, position: 'relative' }}>
    <h1 className="font-Castoro pl-8 text-5xl sm:text-7xl text-[#244855] font-normal flex flex-wrap items-center gap-x-4">
      <span>{title}</span>
      <GiSoapExperiment className="pb-4"/>
    </h1>
  </div>
);*/

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-8 pt-10 sm:pt-20 sm:pb-16 md:pt-[100px] md:pb-24 
   bg-[#90AEAD]">
    <h1 className="font-Castoro pl-8 text-5xl sm:text-7xl 
    text-[#244855] 
    font-normal">
      {title}
    </h1>
  </div>
);

/*const PageHeader = ({ title }) => {
  // Jaa otsikko osiin - oletetaan että viimeinen sana on "experiment"
  const words = title.split(' ');
  const lastWord = words.pop(); // Ota viimeinen sana
  const restOfTitle = words.join(' '); // Loput sanat

  return (
    <div className="mx-auto w-full text-left pt-10 pb-8 sm:pt-20 sm:pb-16 md:pt-[100px] md:pb-24 bg-[#90AEAD]" 
         style={{ zIndex: 1, position: 'relative' }}>
          <h1 className="font-Castoro pl-8 text-5xl sm:text-7xl text-[#244855] font-normal flex flex-wrap items-center leading-tight">
  <span className="mr-4">{restOfTitle}</span>
  <span className="inline-flex items-baseline whitespace-nowrap">
    {lastWord}
    <GiSoapExperiment className="text-5xl sm:text-7xl ml-1 -mb-2" />
  </span>
</h1>*/


          {/*<h1 className="font-Castoro pl-8 text-5xl sm:text-7xl text-[#244855] font-normal flex flex-wrap items-center">
  <span className="mr-6">{restOfTitle}</span>
  <span className="inline-flex items-center whitespace-nowrap relative">
    {lastWord}
    <GiSoapExperiment className="absolute top-0 mt-2 pb-4 mr-0 text-8xl md:text-8xl lg:text-10xl" />
  </span>
</h1>*/}
      {/*<h1 className="font-Castoro pl-8 text-5xl sm:text-7xl text-[#244855] font-normal flex flex-wrap items-center gap-x-4">
        <span>{restOfTitle}</span>
        <span className="inline-flex items-center gap-x-0 whitespace-nowrap">
          {lastWord}
          <GiSoapExperiment className="pb-4 mr-0 text-8xl md:text-8xl lg:text-8xl"/>
        </span>
      </h1>
    </div>
  );
};*/}

export default function Home() {
  const [auth, setAuth] = useAuth();
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

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
      console.log("Home.jsx API URL:", axios.defaults.baseURL); // debuggausta varten
      const { data } = await axios.get("/ads");
      console.log("Fetched ads data:", data); // debuggausta varten
      
      if (data) {
        setAdsForSell(data.adsForSell || []);
        setAdsForRent(data.adsForRent || []);
      }
    } catch (error) {
      console.error("API error:", error);
      // Aseta tyhjät taulukot virhetilanteessa
      setAdsForSell([]);
      setAdsForRent([]);
    }
  };

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
        <PageHeader title="Space realization application experiment"/>
        </div>
        
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FBE9D0]">
        {adsForSell && adsForSell.length > 0 ? (
            adsForSell.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">Ei ilmoituksia myynnissä</p>
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
        py-10 bg-[#FBE9D0]">
        {adsForRent && adsForRent.length > 0 ? (
            adsForRent.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">Ei vuokrailmoituksia</p>
          )}
        </div>
       
      </div>
  );
}