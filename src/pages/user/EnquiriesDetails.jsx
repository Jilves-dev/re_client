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
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reply modal states
  const [replyModal, setReplyModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      fetchConversations();
    }
  }, [auth?.token]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/all-enquiries");
      console.log("EnquiriesDetails - Conversations data:", data);
      setConversations(data || []);
      setLoading(false);
    } catch (err) {
      console.error("❌ Enquiries error:", err);
      setLoading(false);
    }
  };

  const handleReplyClick = (conversation) => {
    if (!conversation.ad?._id) {
      toast.error("Cannot reply: Property information is missing");
      return;
    }
    console.log("Opening reply for:", conversation);
    setSelectedConversation(conversation);
    setReplyMessage("");
    setReplyModal(true);
  };

  const handleCloseModal = () => {
    setReplyModal(false);
    setSelectedConversation(null);
    setReplyMessage("");
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    
    if (!replyMessage.trim()) {
      toast.error("Please write a message");
      return;
    }

    // Hae alkuperäinen enquiry (ensimmäinen viesti)
    const originalEnquiry = selectedConversation.messages.find(m => m.type === 'enquiry');
    
    if (!originalEnquiry) {
      toast.error("Cannot find original enquiry");
      return;
    }

    const recipientEmail = originalEnquiry.senderEmail;
    const recipientName = originalEnquiry.sender?.name || originalEnquiry.sender?.username;

    console.log("Sending reply to:", { recipientEmail, recipientName });

    try {
      setSending(true);
      
      const { data } = await axios.post("/reply-to-enquiry", {
        message: replyMessage,
        recipientEmail: recipientEmail,
        recipientName: recipientName,
        adId: selectedConversation.ad._id,
        originalMessage: originalEnquiry.message
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Reply sent successfully! ✉️");
        handleCloseModal();
        // Päivitä keskustelut
        fetchConversations();
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
          Customer Enquiries - Conversations ({conversations.length})
        </h2>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 font-castoro">
              No enquiries yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-green-500">
                
                {/* Property header */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div className="flex-1">
                    <Link 
                      to={`/ad/${conv.ad?.slug}`} 
                      className="text-lg font-castoro text-[#244855] hover:text-[#90AEAD] break-words"
                    >
                      📍 {conv.ad?.address}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {conv.ad?.type} - {conv.ad?.price}€
                    </p>
                  </div>
                </div>

                {/* Message thread */}
                <div className="space-y-3 max-h-80 overflow-y-auto mb-4 bg-gray-50 p-4 rounded">
                  {conv.messages && conv.messages.length > 0 ? (
                    conv.messages.map((msg, msgIdx) => (
                      <div 
                        key={msgIdx}
                        className={`p-3 rounded-lg ${
                          msg.isOwn 
                            ? 'bg-[#90AEAD] bg-opacity-20 ml-8 border-l-4 border-[#90AEAD]' 
                            : 'bg-white mr-8 border-l-4 border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-sm text-[#244855]">
                            {msg.isOwn ? 'You' : (msg.sender?.name || msg.sender?.username || 'Customer')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Date unavailable'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                          {msg.message || 'No message'}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500 italic">
                            {msg.type === 'enquiry' ? '📧 Initial Enquiry' : '💬 Reply'}
                          </span>
                          {msg.senderEmail && !msg.isOwn && (
                            <span className="text-xs text-gray-500">
                              ({msg.senderEmail})
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages</p>
                  )}
                </div>

                {/* Reply button */}
                {conv.ad?._id && (
                  <button
                    onClick={() => handleReplyClick(conv)}
                    className="flex items-center gap-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors text-sm"
                  >
                    <SendOutlined /> Reply to Customer
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REPLY MODAL */}
      {replyModal && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#90AEAD] p-6 rounded-t-lg flex justify-between items-center">
              <h3 className="text-2xl font-castoro text-[#244855]">
                Reply to Customer
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
              {/* Property info */}
              <div className="bg-gray-50 p-4 rounded mb-4 border-l-4 border-gray-300">
                <p className="text-xs text-gray-500 mb-2">Property:</p>
                <p className="text-sm font-semibold text-gray-700">
                  {selectedConversation.ad?.address} - {selectedConversation.ad?.price}€
                </p>
              </div>

              {/* Recent messages */}
              <div className="bg-blue-50 p-4 rounded mb-4 max-h-60 overflow-y-auto">
                <p className="text-xs text-gray-500 mb-3">Conversation history:</p>
                <div className="space-y-2">
                  {selectedConversation.messages.map((msg, idx) => (
                    <div key={idx} className="text-sm border-b border-blue-200 pb-2 last:border-0">
                      <span className="font-semibold text-[#244855]">
                        {msg.isOwn ? 'You' : (msg.sender?.name || 'Customer')}:
                      </span>
                      <p className="ml-2 text-gray-700 mt-1">"{msg.message}"</p>
                      <span className="text-xs text-gray-500">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI') : ''}
                      </span>
                    </div>
                  ))}
                </div>
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