import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/nav/Sidebar";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-4 sm:pl-8">
      <h1 className="font-decomang text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function AdCreate() {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setRent(true);
    setSell(false);
  };

  return (
    <div name='home' className='w-full pb-10'>
      <div name="header">
        <PageHeader title="Create post"/>
      </div>
      <Sidebar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
        <div></div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleSell}
            className="py-2.5 px-10 me-2 mb-2 text-sm font-medium
            !text-[#E64833] focus:outline-none !bg-[#FBE9D0] 
            rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
            !hover:text-[#FFFFFF] focus:z-10 focus:ring-4
            focus:ring-gray-100 dark:focus:ring-gray-700
            dark:bg-gray-800 dark:text-gray-400
            dark:border-gray-600 dark:hover:text-white
            dark:hover:bg-gray-700"
          >
            <span className="h2 font-baskervville font-2xl">Sell</span>
          </button>
          {sell && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/ad/create/sell/House")}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium font-baskervville
                !text-[#E64833] focus:outline-none !bg-[#FBE9D0] 
                rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
                !hover:text-[#FFFFFF] focus:z-10 focus:ring-4
                focus:ring-gray-100 dark:focus:ring-gray-700
                dark:bg-gray-800 dark:text-gray-400
                dark:border-gray-600 dark:hover:text-white
                dark:hover:bg-gray-700"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/Land")}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-baskervville font-medium
                !text-[#E64833] focus:outline-none !bg-[#FBE9D0] 
                rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
                !hover:text-[#FFFFFF] focus:z-10 focus:ring-4
                focus:ring-gray-100 dark:focus:ring-gray-700
                dark:bg-gray-800 dark:text-gray-400
                dark:border-gray-600 dark:hover:text-white
                dark:hover:bg-gray-700"
              >
                Land
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleRent}
            className="py-2.5 px-10 me-2 mb-2 text-sm font-baskervville font-medium
            !text-[#E64833] focus:outline-none !bg-[#FBE9D0] 
            rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
            !hover:text-[#FFFFFF] focus:z-10 focus:ring-4
            focus:ring-gray-100 dark:focus:ring-gray-700
            dark:bg-gray-800 dark:text-gray-400
            dark:border-gray-600 dark:hover:text-white
            dark:hover:bg-gray-700"
          >
            <span className="h2 font-baskervville !font-[#90AEAD]">Rent</span>
          </button>
          {rent && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/ad/create/rent/House")}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium font-baskervville
                !text-[#E64833] focus:outline-none !bg-[#FBE9D0] 
                rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
                !hover:text-[#FFFFFF]  focus:z-10 focus:ring-4
                focus:ring-gray-100 dark:focus:ring-gray-700
                dark:bg-gray-800 dark:text-gray-400
                dark:border-gray-600 dark:hover:text-white
                dark:hover:bg-gray-700"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/Land")}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium font-baskervville
                !text-[#E64833] focus:outline-none bg-[#FBE9D0] 
                rounded border-2 !border-[#874F41] !hover:bg-[#90AEAD]
                !hover:text-[#FFFFFF] focus:z-10 focus:ring-4
                focus:ring-gray-100 dark:focus:ring-gray-700
                dark:bg-gray-800 dark:text-gray-400
                dark:border-gray-600 dark:hover:text-white
                dark:hover:bg-gray-700"
              >
                Land
              </button>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}









