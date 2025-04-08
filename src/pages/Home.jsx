import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";
//import DebugComponent from "../components/DebugComponent";
import './Home.css';


{/*const PageHeader = ({ title }) => {
  // Erottele ensimmäinen kirjain ja loput tekstistä
  const firstLetter = title.charAt(0);
  const restOfTitle = title.slice(1);

  return (
    <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#90AEAD]">
      <h1 className="pl-8 text-5xl sm:text-7xl text-[#244855]">
        <span className="floral font-thin">{firstLetter}</span>
        <span className="font-castoro font-normal">{restOfTitle}</span>
      </h1>
    </div>
  );
};*/}

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 
   bg-[#90AEAD]">
    <h1 className="font-Castoro pl-8 text-5xl sm:text-7xl 
    text-[#244855] 
    font-normal">
      {title}
    </h1>
  </div>
);

{/*const PageHeader = ({ title }) => (
  <div
    className="mx-auto w-full text-align:left pb-16 pt-20"
    style={{
      background: "linear-gradient(to bottom, #90AEAD, rgba(144, 174, 173, 0.5), rgba(144, 174, 173, 0))",
      backdropFilter: "blur(10px)", // Pehmentää taustaa
    }}
  >
    <h1 className="font-yeseva-one-regular pl-8 text-5xl sm:text-7xl text-[#E64833] font-bold">
      {title}
    </h1>
  </div>
);


const PageHeader = ({ title }) => (
  <div className="relative mx-auto w-full text-align:left pb-16 pt-20 bg-[#90AEAD]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#90AEAD] via-[#90AEAD]/60 to-transparent"></div>
    <h1 className="relative font-yeseva-one-regular pl-8 text-5xl sm:text-7xl text-[#E64833] font-bold">
      {title}
    </h1>
  </div>
);

<filter id="filter0_d_514_167" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="10"/>
<feGaussianBlur stdDeviation="15"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.556863 0 0 0 0 0.552941 0 0 0 0 0.541176 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_514_167"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_514_167" result="shape"/>
</filter>
*/}


//     text-[#FFFFFF] 
//  bg-[#90AeAD]
// tumma sin #244855
//  pun #E64833
//     rusk #874F41
//   vaal vihreä #90AEAD   
//    vaal #FBE9D0  
//  gold #FFD700
// // silver #C0C0C0

export default function Home() {
  const [auth, setAuth] = useAuth();
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  /*const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
    //  console.log("Fetched ads:", data);  // Tulosta tiedot varmistaaksesi, että haetaan jotain  
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (error) {
      //console.log("axios error: ", error.message);
    }
  };*/

  const fetchAds = async () => {
    try {
      console.log("Home.jsx API URL:", axios.defaults.baseURL); // Lisää tämä debuggausta varten
      const { data } = await axios.get("/ads");
      console.log("Fetched ads data:", data); // Lisää tämä debuggausta varten
      
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
        <div className="search-container flex justify-center mx-auto">
        <SearchMain />
        </div>
        <br></br>
        <br></br>
        </div>
        <div name="header" className="w-full">
        <PageHeader title="Real Estate Marketplace"/>
        </div>
        
       
        
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FBE9D0]">
          {/*{adsForSell.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}*/}
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
          {/*{adsForRent.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}*/}
        {adsForRent && adsForRent.length > 0 ? (
            adsForRent.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">Ei vuokrailmoituksia</p>
          )}
        </div>

        {/*<br></br>
        <DebugComponent />
        <br></br>*/}
       
      </div>
  );
}


