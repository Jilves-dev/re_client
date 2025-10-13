import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";
import Spinner from "../../components/Spinner";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-6">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Dashboard() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const seller = auth.user?.role?.includes("Seller");

  useEffect(() => {
    fetchAds(3);
  }, [auth.token !== "", page]);

  useEffect(() => {
    if (page === 1) return;
    fetchAds();
  }, [page]);

  const fetchAds = async (itemsPerPage = 3) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/user-ads/${page}?limit=${itemsPerPage}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAds([]);
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Dashboard" />
        <Sidebar />
        <Spinner message="Loading your properties..." />
      </div>
    );
  }

  // Empty state
  if (!ads?.length) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Dashboard" />
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center px-4">
            Hey {auth.user?.name || auth.user?.username},
            <br />
            You have not posted any properties yet!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full pb-6'>
      <div name="header">
        <PageHeader title="Dashboard"/>
      </div>
      <Sidebar />
      {!seller ? (
        <div className="flex justify-center items-center text-center">
          <h2 className="flex justify-center py-10 font-castoro">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            Welcome to property realization marketplace App!
          </h2>
        </div>
      ) : (
        <>
        <div className="flex justify-center py-10">
          <h1 className="font-castoro text-[#244855] text-center"> {`total ${total} ads found`} </h1>
          </div>
            <div className="grid grid-cols-1 
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  xl:grid-cols-3   
                  justify-center mb-10 gap-y-10 
                  place-items-center 
                  px-4 sm:px-8 
                  py-10 bg-[#FBE9D0] animate-fadeIn">
                    {ads?.map((ad) => (
                      <UserAdCard 
                      ad={ad} 
                      key={ad._id} 
                      />
                    ))}
                  </div>

                  {ads?.length < total && (
                    <div className="flex justify-center mt-4 mb-4">
                      <button
                        disabled={loading}
                        className="bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] font-yeseva-one-regular py-2 px-4 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                {loading ? "Loading..." : `${ads?.length} / ${total} Load more`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}



