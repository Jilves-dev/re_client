import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { MessageOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const PageHeader = ({ title }) => (
  <div className="w-full text-left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Enquiries() {
  const [auth] = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reply modal states
  const [replyModal, setReplyModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (auth?.token) fetchConversations();
  }, [auth?.token]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user-enquiries");
      console.log("Conversations data:", data);
      setConversations(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch conversations error:", err);
      setLoading(false);
    }
  };

  const handleReplyClick = (conversation) => {
    console.log("Opening reply modal for:", conversation);
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

    // Hae viimeinen viesti saadaksesi vastaanottajan tiedot
    const lastMessage = selectedConversation.messages[selectedConversation.messages.length - 1];
    const recipientEmail = lastMessage.sender?.email;
    const recipientName = lastMessage.sender?.name || lastMessage.sender?.username;

    if (!recipientEmail) {
      toast.error("Cannot find recipient email");
      return;
    }

    try {
      setSending(true);
      
      const { data } = await axios.post("/reply-to-enquiry", {
        message: replyMessage,
        recipientEmail: recipientEmail,
        recipientName: recipientName,
        adId: selectedConversation.ad._id,
        originalMessage: lastMessage.message
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
        <PageHeader title="My Enquiries" />
        <Sidebar />
        <Spinner message="Loading conversations..." />
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="My Enquiries" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        <h2 className="font-castoro text-2xl text-[#244855] mb-6">
          My Conversations ({conversations.length})
        </h2>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 font-castoro">
              No conversations yet. Contact a property owner to start a conversation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
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
                  
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {conv.unreadCount} new
                    </span>
                  )}
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
                            {msg.isOwn ? 'You' : (msg.sender?.name || msg.sender?.username || 'Other')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.createdAt).toLocaleDateString('fi-FI', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <span className="text-xs text-gray-500 italic mt-1 block">
                          {msg.type === 'enquiry' ? '📧 Enquiry' : '💬 Reply'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages</p>
                  )}
                </div>

                {/* Reply button */}
                <button 
                  onClick={() => handleReplyClick(conv)}
                  className="flex items-center gap-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  <SendOutlined /> Reply to Conversation
                </button>
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
                Reply to Conversation
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
                <p className="text-xs text-gray-500 mb-3">Recent messages:</p>
                <div className="space-y-2">
                  {selectedConversation.messages.slice(-3).map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-semibold">
                        {msg.isOwn ? 'You' : (msg.sender?.name || 'Other')}:
                      </span>
                      <span className="ml-2 text-gray-700 italic">"{msg.message}"</span>
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