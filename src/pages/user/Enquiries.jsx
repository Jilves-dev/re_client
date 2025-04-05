import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";
//import oldDam2 from "../../assets/old_dam2.jpg"; 
//import LikeUnlike from "../../components/misc/LikeUnlike";
//import { FcLike, FcLikePlaceholder } from "react-icons/fc";


const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

/*const PageHeader = ({ title }) => (
  <div
    className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20"
    style={{
      backgroundImage: `url(${oldDam2})`,
      backgroundSize: "cover", // Varmistetaan että kuva peittää koko taustan
      backgroundPosition: "center", // Keskitetään kuva
      backgroundRepeat: "no-repeat", // Estetään kuvan toistuminen
    }}
  >
    <div className="flex items-center pl-6">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833] relative z-10">
        {title}
      </h1>
    </div>
  
  </div>
);*/


export default function Enquiries() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/enquiries`);
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full pb-10'>
      <div name="header">
        <PageHeader title="Enquiries"/>
      </div>
      <Sidebar />

      {!ads?.length ? (
        <div className="flex justify-center items-center text-center !important">
          <h2 className="flex justify-center py-10 font-castoro">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            <br></br>
            You have not enquired any properties yet!
          </h2>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h1 className="font-castoro flex justify-center py-10 text-center !important">
              You have enquired  
              {" "} {ads?.length} {" "} 
               properties
            </h1>
            <div className="grid grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 
                    xl:grid-cols-3   
                    justify-center mb-10 gap-y-10 
                    place-items-center 
                    px-4 sm:px-8 
                    py-10 bg-[#FBE9D0]">
                      {ads?.map((ad) => (
                        <AdCard ad={ad} key={ad._id} />
                      ))}
                  </div>
          </div>
        </>
      )}
    </div>
  );
}



