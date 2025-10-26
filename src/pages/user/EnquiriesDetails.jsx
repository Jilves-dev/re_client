import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MessageOutlined, ArrowLeftOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

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
  
  // ✅ Reply modal states
  const [replyModal, setReplyModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

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

  // ✅ Avaa reply modal
  const handleReplyClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyMessage(""); // Tyhjennä edellinen viesti
    setReplyModal(true);
  };

  // ✅ Sulje modal
  const handleCloseModal = () => {
    setReplyModal(false);
    setSelectedEnquiry(null);
    setReplyMessage("");
  };

  // ✅ Lähetä vastaus
  const handleSendReply = async (e) => {
    e.preventDefault();
    
    if (!replyMessage.trim()) {
      toast.error("Please write a message");
      return;
    }

    try {
      setSending(true);
      
      const { data } = await axios.post("/reply-to-enquiry", {
        message: replyMessage,
        recipientEmail: selectedEnquiry.email,
        recipientName: selectedEnquiry.name,
        adId: selectedEnquiry.ad._id,
        originalMessage: selectedEnquiry.message // Lisätään alkuperäinen viesti
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Reply sent successfully! ✉️");
        handleCloseModal();
      }
      
      setSending(false);
    } catch (err) {
      console.error("Reply error:", err);
      toast.error("Failed to send reply. Please try again.");
      setSending(false);
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

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <Link 
                        to={`/ad/${enquiry.ad?.slug}`}
                        className="text-[#90AEAD] hover:underline text-xs sm:text-sm break-words inline-block"
                      >
                        Re: {enquiry.ad?.address} - {enquiry.ad?.price}€
                      </Link>

                      {/* ✅ Reply-nappi */}
                      <button
                        onClick={() => handleReplyClick(enquiry)}
                        className="flex items-center gap-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors text-sm"
                      >
                        <SendOutlined /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ REPLY MODAL */}
      {replyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#90AEAD] p-6 rounded-t-lg flex justify-between items-center">
              <h3 className="text-2xl font-castoro text-[#244855]">
                Reply to {selectedEnquiry?.name}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-[#244855] hover:text-[#874F41] transition-colors"
              >
                <CloseOutlined style={{ fontSize: '24px' }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Original enquiry */}
              <div className="bg-gray-50 p-4 rounded mb-4 border-l-4 border-gray-300">
                <p className="text-xs text-gray-500 mb-2">Original enquiry:</p>
                <p className="text-sm text-gray-700 italic">"{selectedEnquiry?.message}"</p>
                <p className="text-xs text-gray-500 mt-2">
                  About: {selectedEnquiry?.ad?.address} - {selectedEnquiry?.ad?.price}€
                </p>
              </div>

              {/* Reply form */}
              <form onSubmit={handleSendReply}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your reply:
                  </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#90AEAD] focus:border-transparent"
                    rows={6}
                    placeholder="Write your reply here..."
                    autoFocus
                  />
                </div>

                {/* Recipient info */}
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>To:</strong> {selectedEnquiry?.email}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={sending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={sending || !replyMessage.trim()}
                  >
                    <SendOutlined />
                    {sending ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}