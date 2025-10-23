import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import Logo from "../logo.svg";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#90AEAD]">
    <div className="flex items-center pl-10">
      <h1 className="font-Castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#244855]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Agent() {
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

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

  // Custom shadow for profile image
  const customShadow = {
    boxShadow: '0 10px 25px -5px rgba(144, 174, 173, 0.5), 0 8px 10px -6px rgba(144, 174, 173, 0.3)'
  };

  return (
    <div className='max-w-screen w-full pb-10'>
      <div name="header">
        <PageHeader title={agent?.name ?? agent?.username} />
      </div>

      {/* Portfolio Section */}
      <div className="bg-[#FBE9D0] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <img
              src={agent?.photo?.Location ?? Logo}
              alt={agent?.username}
              style={customShadow}
              className="w-64 h-64 rounded-full object-cover border-2 border-[#90AEAD]"
            />
          </div>

          {/* Agent Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12" style={customShadow}>
            {/* Name */}
            <h2 className="font-Castoro text-4xl md:text-5xl text-[#244855] text-center mb-6">
              {agent?.name || agent?.username}
            </h2>

            {/* Username */}
            {agent?.name && agent?.username && (
              <p className="text-center text-[#90AEAD] text-lg mb-6">
                @{agent.username}
              </p>
            )}

            {/* Company Name */}
            {agent?.company && (
              <div className="mb-6">
                <h3 className="font-Castoro text-xl text-[#874F41] mb-2">Company</h3>
                <p className="text-[#244855] text-lg">{agent.company}</p>
              </div>
            )}

            {/* Address */}
            {agent?.address && (
              <div className="mb-6">
                <h3 className="font-Castoro text-xl text-[#874F41] mb-2">Location</h3>
                <p className="text-[#244855] text-lg">{agent.address}</p>
              </div>
            )}

            {/* About */}
            {agent?.about && (
              <div className="mb-6">
                <h3 className="font-Castoro text-xl text-[#874F41] mb-2">About me</h3>
                <p className="text-[#244855] text-lg leading-relaxed whitespace-pre-line">
                  {agent.about}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-[#90AEAD]">
              <div className="flex justify-center items-center gap-2">
                <span className="text-3xl font-Castoro text-[#E64833]">
                  {ads?.length || 0}
                </span>
                <span className="text-lg text-[#244855]">
                  Active Listing{ads?.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      {ads?.length > 0 && (
        <>
          <h2 className="font-Castoro text-3xl text-center text-[#244855] mt-16 mb-8">
            Recent Listings
          </h2>

          <div className="grid grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-2 
            xl:grid-cols-3   
            justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FBE9D0] animate-fadeIn">
            {ads.map((ad) => (
              <AdCard 
                ad={ad} 
                key={ad._id} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}





{/*import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#90AEAD]">
    <div className="flex items-center pl-10">
      <h1 className="font-Castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#244855]">
        {title}
      </h1>
    </div>
  </div>
);

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
}*/}