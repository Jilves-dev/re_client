import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Enquiries() {
  const [auth] = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) fetchConversations();
  }, [auth?.token]);

  const fetchConversations = async () => {
    try {
      const { data } = await axios.get("/user-enquiries");
      setConversations(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen pb-10 bg-[#FBE9D0]">
      <Sidebar />
      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-castoro mb-6">My Conversations ({conversations.length})</h2>

        {conversations.length === 0 ? (
          <p>No conversations yet</p>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                {/* Property info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link to={`/ad/${conv.ad.slug}`} className="text-lg font-bold text-[#244855] hover:text-[#90AEAD]">
                      {conv.ad.address}
                    </Link>
                    <p className="text-sm text-gray-600">{conv.ad.price}€</p>
                  </div>
                  
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      {conv.unreadCount} new
                    </span>
                  )}
                </div>

                {/* Message thread */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {conv.messages.map((msg, msgIdx) => (
                    <div 
                      key={msgIdx}
                      className={`p-3 rounded ${
                        msg.isOwn 
                          ? 'bg-blue-50 ml-8' 
                          : 'bg-gray-50 mr-8'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm">
                          {msg.isOwn ? 'You' : msg.sender?.name || 'Other'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.createdAt).toLocaleDateString('fi-FI')}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply button */}
                <button 
                  className="mt-4 bg-[#90AEAD] text-white px-4 py-2 rounded hover:bg-[#7a9a99]"
                >
                  Reply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}






/*import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";
import Spinner from "../../components/Spinner";


const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Enquiries() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (auth?.token) {
    fetchEnquiries();
  }
}, [auth?.token]);

const fetchEnquiries = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get("/user-enquiries"); // ✅ Oikea endpoint
    console.log("Enquiries data:", data);
    setAds(data || []);
    setLoading(false);
  } catch (err) {
    console.error("Enquiries error:", err);
    setAds([]);
    setLoading(false);
  }
};

  // ✅ LOADING STATE - Näytä spinner/viesti kun ladataan
  if (loading) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="Enquiries"/>
        <Sidebar />
          <Spinner message="Loading your enquiries ..." />
      </div>
    );
  }

  // ✅ EMPTY STATE - Näytä kun data on ladattu mutta tyhjä
  if (!ads?.length) {
    return (
      <div className='w-full pb-10'>
        <PageHeader title="Enquiries"/>
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center px-4">
            Hey {auth.user?.name || auth.user?.username},
            <br/>
            You have not enquired any properties yet!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full pb-10'>
      <PageHeader title="Enquiries"/>
      <Sidebar />
      
      <div className="flex justify-center py-10">
        <h1 className="font-castoro text-2xl">
          You have enquired {ads.length} {ads.length === 1 ? 'property' : 'properties'}
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
}*/