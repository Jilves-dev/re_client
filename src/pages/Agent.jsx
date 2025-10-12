import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#90AEAD]">
    <div className="flex items-center pl-10">
      <h1 className="font-Castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#FBE9D0]">
        {title}
      </h1>
    </div>
  </div>
);

/*const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-8 pt-10 sm:pt-20 sm:pb-16 md:pt-[100px] md:pb-24 
   bg-[#90AEAD]">
    <h1 className="font-Castoro pl-8 text-5xl sm:text-7xl 
    text-[#244855] 
    font-normal">
      {title}
    </h1>
  </div>
);*/

export default function Agent() {
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  //   console.log(params.username);

  useEffect(() => {
    if (params?.username) fetchAgent();
  }, [params?.username]);

  const fetchAgent = async () => {
    try {
      const { data } = await axios.get(`/agent/${params.username}`);
      setAgent(data.user);
      setAds(data.ads);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
     
      <div className="flex justify-center items-center py-20">
            <div className="w-24 h-24 border-2 border-[#90AEAD] border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
    );
  }

  return (
    <div className='max-w-screen w-full pb-10'>
      <div name="header">
        <PageHeader title={agent?.name ?? agent?.username} />
      </div>

      <div className="flex justify-center py-10 mx-auto">
        <div className="grid grid-cols-1
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
          <UserCard user={agent} />
        </div>
      </div>

      <h2 className="text-center m-5"> recent Listings</h2>

      <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
          {ads?.map((ad, index) => (
            <AdCard 
              ad={ad} 
              key={ad._id} 
              />
          ))}
        </div>
    </div>
  );
}



 {/*<div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-10%" }}
      >
        <div className="display-1 text-center">Loading...</div>
      </div>*/}