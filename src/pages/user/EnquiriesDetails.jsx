import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MessageOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function EnquiriesDetails() {
  const [auth] = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      fetchEnquiries();
    }
  }, [auth?.token]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/all-enquiries");
      console.log("Enquiries data:", data);
      setEnquiries(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Enquiries error:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="All Enquiries" />
        <Sidebar />
        <Spinner message="Loading enquiries..." />
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="All Enquiries" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        <Link 
          to="/user/analytics" 
          className="inline-flex items-center gap-2 text-[#90AEAD] hover:text-[#7a9a99] mb-6 font-castoro"
        >
          <ArrowLeftOutlined /> Back to Analytics
        </Link>

        <h2 className="font-castoro text-2xl text-[#244855] mb-6">
          All Customer Enquiries ({enquiries.length})
        </h2>

        {enquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 font-castoro">
              No enquiries yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
  {enquiries.map((enquiry, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-green-500">

        <span className="text-xs text-gray-500 whitespace-nowrap ml-10">
              {new Date(enquiry.createdAt).toLocaleDateString('fi-FI', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>

      <div className="flex items-start gap-3 sm:gap-4">
        <MessageOutlined className="text-xl sm:text-2xl text-green-500 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-castoro text-base sm:text-lg text-[#244855] break-words">
                {enquiry.name}
              </h3>
              <p className="text-sm text-gray-600 break-all">{enquiry.email}</p>
              {enquiry.phone && (
                <p className="text-sm text-gray-600">{enquiry.phone}</p>
              )}
            </div>
          
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded mb-3">
            <p className="text-sm sm:text-base text-gray-700 break-words">{enquiry.message}</p>
          </div>

          <Link 
            to={`/ad/${enquiry.ad?.slug}`}
            className="text-[#90AEAD] hover:underline text-xs sm:text-sm break-words inline-block"
          >
            Re: {enquiry.ad?.address} - {enquiry.ad?.price}€
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </div>
  );
}