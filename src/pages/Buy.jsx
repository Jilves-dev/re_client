import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";


const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#90AEAD]">
    <h1 className="font-Castoro pl-10 text-5xl sm:text-7xl text-[#244855] font-normal">
      {title}
    </h1>
  </div>
);

export default function Buy() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-sell");
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='max-w-screen w-full pb-10'>
        <div className="container_bg">
        <div className="search-container">
      <SearchMain />
       </div>
      <br></br>
      <br></br>
      </div>
      <div name="buy">
      <PageHeader title="For Sell"/>
      </div>
      <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
        {ads?.map((ad, index) => (
          <AdCard 
            ad={ad} 
            key={ad._id} 
            /*className={index % 3 === 0 ? 'justify-self-end' :
                       index % 3 === 1 ? '' :
                       'justify-self-start'}*/
            />
        ))}
      </div>
    </div>
  );
}





