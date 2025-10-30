import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { MessageOutlined, MailOutlined, CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const PageHeader = ({ title }) => (
  <div className="w-full text-left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-5xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Conversations() {
  const [auth] = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Reply modal states
  const [replyModal, setReplyModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  // ✅ PARANNETTU: useCallback estää turhia uudelleenrenderöintejä
  const fetchConversations = useCallback(async (showLoadingSpinner = true) => {
    // ✅ Varmista että auth on valmis
    if (!auth?.token || !auth?.user?._id) {
      console.log("⏳ Auth not ready yet, waiting...");
      return;
    }

    try {
      if (showLoadingSpinner) {
        setLoading(true);
      }
      setError(null);

      //console.log("🔄 Fetching conversations for user:", auth.user._id);
      
      // ✅ Lisää timeout 10 sekuntiin (Vercel cold start voi kestää)
      const { data } = await axios.get("/user-conversations", {
        timeout: 10000
      });
      
      console.log("✅ Conversations fetched:", data?.length || 0);
      
      // ✅ Varmista että data on array
      setConversations(Array.isArray(data) ? data : []);
      setLoading(false);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error("❌ Fetch conversations error:", err);
      
      setLoading(false);
      
      // ✅ Käyttäjäystävällinen virheviesti
      if (err.code === 'ECONNABORTED') {
        setError("Request timed out. The server might be starting up. Please try again.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again in a moment.");
      } else {
        setError("Failed to load conversations. Please try refreshing the page.");
      }
      
      // ✅ Automaattinen retry max 2 kertaa
      if (retryCount < 2) {
        console.log(`🔄 Auto-retry attempt ${retryCount + 1}/2`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchConversations(false);
        }, 2000); // 2 sekunnin viive
      }
    }
  }, [auth?.token, auth?.user?._id, retryCount]);

  // ✅ PARANNETTU: useEffect joka odottaa että auth on valmis
  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const initFetch = async () => {
      // Odota että auth on varmasti valmis
      if (!auth?.token || !auth?.user?._id) {
        console.log("⏳ Waiting for auth to be ready...");
        // Yritä uudelleen 500ms kuluttua
        timeoutId = setTimeout(initFetch, 500);
        return;
      }

      if (mounted) {
        await fetchConversations();
      }
    };

    initFetch();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [auth?.token, auth?.user?._id, fetchConversations]);

  const handleReplyClick = (conversation) => {
    if (!conversation.ad?._id) {
      toast.error("Cannot reply: Property information is missing");
      return;
    }
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

    const lastOtherMessage = [...selectedConversation.messages]
      .reverse()
      .find(m => !m.isOwn);
    
    if (!lastOtherMessage) {
      toast.error("Cannot find recipient information");
      return;
    }

    const recipientEmail = lastOtherMessage.senderEmail;
    const recipientName = lastOtherMessage.sender?.name || lastOtherMessage.sender?.username;

    try {
      setSending(true);
      
      const { data } = await axios.post("/reply-to-enquiry", {
        message: replyMessage,
        recipientEmail: recipientEmail,
        recipientName: recipientName,
        adId: selectedConversation.ad._id,
        originalMessage: lastOtherMessage.message
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Reply sent successfully! ✉️");
        handleCloseModal();
        // Päivitä keskustelut ilman loading spinneriä
        fetchConversations(false);
      }
      
      setSending(false);
    } catch (err) {
      console.error("Reply error:", err);
      toast.error("Failed to send reply. Please try again.");
      setSending(false);
    }
  };

  // ✅ LISÄTTY: Manual refresh button
  const handleManualRefresh = () => {
    setRetryCount(0);
    fetchConversations(true);
  };

  // ✅ Loading state
  if (loading && conversations.length === 0) {
    return (
      <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
        <PageHeader title="Conversations" />
        <Sidebar />
        <div className="container mx-auto px-4 py-10">
          <Spinner message="Loading conversations..." />
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              This may take a moment if the server is starting up...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error && conversations.length === 0) {
    return (
      <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
        <PageHeader title="Conversations" />
        <Sidebar />
        <div className="container mx-auto px-4 py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <MessageOutlined style={{ fontSize: '48px', color: '#E64833' }} className="mb-4" />
            <h3 className="text-xl font-castoro text-red-700 mb-2">
              Unable to Load Conversations
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleManualRefresh}
              className="bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-6 py-2 rounded transition-colors flex items-center gap-2 mx-auto"
            >
              <ReloadOutlined /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Conversations" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-castoro text-2xl text-[#244855]">
            All Conversations ({conversations.length})
          </h2>
          {/* ✅ LISÄTTY: Manual refresh button */}
          <button 
            onClick={handleManualRefresh}
            className="bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors flex items-center gap-2 text-sm"
            disabled={loading}
          >
            <ReloadOutlined spin={loading} /> Refresh
          </button>
        </div>

        {/* ✅ Warning jos lataus kesti kauan */}
        {retryCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ Connection was slow. The server might have been starting up. 
              {retryCount < 2 && " Retrying automatically..."}
            </p>
          </div>
        )}

        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MessageOutlined style={{ fontSize: '48px', color: '#90AEAD' }} className="mb-4" />
            <p className="text-gray-600 font-castoro text-lg mb-2">
              No conversations yet
            </p>
            <p className="text-gray-500 text-sm">
              Contact a property owner to start a conversation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  conv.isOwner ? 'border-[#90AEAD]' : 'border-[#874F41]'
                }`}
              >
                {/* Property header */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link 
                        to={`/ad/${conv.ad?.slug}`} 
                        className="text-lg font-castoro text-[#244855] hover:text-[#90AEAD] break-words"
                      >
                        📍 {conv.ad?.address}
                      </Link>
                      {conv.isOwner && (
                        <span className="bg-[#90AEAD] text-white text-xs px-2 py-1 rounded">
                          Your Property
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {conv.ad?.type} - {conv.ad?.price}€
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conv.messageCount} message{conv.messageCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {conv.unreadCount} new
                    </span>
                  )}
                </div>

                {/* Message thread */}
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4 bg-gray-50 p-4 rounded">
                  {conv.messages && conv.messages.length > 0 ? (
                    conv.messages.map((msg, msgIdx) => (
                      <div 
                        key={msgIdx}
                        className={`p-3 rounded-lg transition-all ${
                          msg.isOwn 
                            ? 'bg-[#90AEAD] bg-opacity-20 ml-8 border-l-4 border-[#90AEAD]' 
                            : 'bg-white mr-8 border-l-4 border-gray-300 shadow-sm'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[#244855]">
                              {msg.isOwn ? 'You' : (msg.sender?.name || msg.sender?.username || 'Other User')}
                            </span>
                            <span className="text-xs text-gray-500 italic">
                              {msg.type === 'enquiry' ? '📧' : '💬'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Date unavailable'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                          {msg.message || 'No message'}
                        </p>
                        
                        {msg.senderEmail && !msg.isOwn && (
                          <p className="text-xs text-gray-500 mt-2">
                            {msg.senderEmail}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages</p>
                  )}
                </div>

                {/* Reply button */}
                <button 
                  onClick={() => handleReplyClick(conv)}
                  className="flex items-center gap-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <MailOutlined /> Reply to Conversation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REPLY MODAL - sama kuin ennen */}
      {replyModal && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
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

            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded mb-4 border-l-4 border-gray-300">
                <p className="text-xs text-gray-500 mb-2">Property:</p>
                <p className="text-sm font-semibold text-gray-700">
                  {selectedConversation.ad?.address} - {selectedConversation.ad?.price}€
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded mb-4 max-h-60 overflow-y-auto">
                <p className="text-xs text-gray-500 mb-3">Conversation history:</p>
                <div className="space-y-2">
                  {selectedConversation.messages.slice(-5).map((msg, idx) => (
                    <div key={idx} className="text-sm border-b border-blue-200 pb-2 last:border-0">
                      <span className="font-semibold text-[#244855]">
                        {msg.isOwn ? 'You' : (msg.sender?.name || 'Other')}:
                      </span>
                      <p className="ml-2 text-gray-700 mt-1">"{msg.message}"</p>
                      <span className="text-xs text-gray-500">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI') : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

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
                    <MailOutlined />
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






/*import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { MessageOutlined, MailOutlined, CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const PageHeader = ({ title }) => (
  <div className="w-full text-left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-4 md:pl-8">
      <h1 className="font-castoro text-5xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Conversations() {
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
      const { data } = await axios.get("/user-conversations");
      console.log("Conversations data:", data);
      setConversations(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch conversations error:", err);
      setLoading(false);
    }
  };

  const handleReplyClick = (conversation) => {
    if (!conversation.ad?._id) {
      toast.error("Cannot reply: Property information is missing");
      return;
    }
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

    // Hae viimeinen viesti joka EI ole oma
    const lastOtherMessage = [...selectedConversation.messages]
      .reverse()
      .find(m => !m.isOwn);
    
    if (!lastOtherMessage) {
      toast.error("Cannot find recipient information");
      return;
    }

    const recipientEmail = lastOtherMessage.senderEmail;
    const recipientName = lastOtherMessage.sender?.name || lastOtherMessage.sender?.username;

    console.log("Sending reply to:", { recipientEmail, recipientName });

    try {
      setSending(true);
      
      const { data } = await axios.post("/reply-to-enquiry", {
        message: replyMessage,
        recipientEmail: recipientEmail,
        recipientName: recipientName,
        adId: selectedConversation.ad._id,
        originalMessage: lastOtherMessage.message
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
        <PageHeader title="Conversations" />
        <Sidebar />
        <Spinner />
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Conversations" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-castoro text-2xl text-[#244855]">
            All Conversations ({conversations.length})
          </h2>
        </div>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MessageOutlined style={{ fontSize: '48px', color: '#90AEAD' }} className="mb-4" />
            <p className="text-gray-600 font-castoro text-lg mb-2">
              No conversations yet
            </p>
            <p className="text-gray-500 text-sm">
              Contact a property owner to start a conversation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  conv.isOwner ? 'border-[#90AEAD]' : 'border-[#874F41]'
                }`}
              >
                * Property header *
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link 
                        to={`/ad/${conv.ad?.slug}`} 
                        className="text-lg font-castoro text-[#244855] hover:text-[#90AEAD] break-words"
                      >
                        📍 {conv.ad?.address}
                      </Link>
                      {conv.isOwner && (
                        <span className="bg-[#90AEAD] text-white text-xs px-2 py-1 rounded">
                          Your Property
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {conv.ad?.type} - {conv.ad?.price}€
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conv.messageCount} message{conv.messageCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {conv.unreadCount} new
                    </span>
                  )}
                </div>

                * Message thread *
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4 bg-gray-50 p-4 rounded">
                  {conv.messages && conv.messages.length > 0 ? (
                    conv.messages.map((msg, msgIdx) => (
                      <div 
                        key={msgIdx}
                        className={`p-3 rounded-lg transition-all ${
                          msg.isOwn 
                            ? 'bg-[#90AEAD] bg-opacity-20 ml-8 border-l-4 border-[#90AEAD]' 
                            : 'bg-white mr-8 border-l-4 border-gray-300 shadow-sm'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[#244855]">
                              {msg.isOwn ? 'You' : (msg.sender?.name || msg.sender?.username || 'Other User')}
                            </span>
                            <span className="text-xs text-gray-500 italic">
                              {msg.type === 'enquiry' ? '📧' : '💬'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Date unavailable'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                          {msg.message || 'No message'}
                        </p>
                        
                        {msg.senderEmail && !msg.isOwn && (
                          <p className="text-xs text-gray-500 mt-2">
                            {msg.senderEmail}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages</p>
                  )}
                </div>

                * Reply button *
                <button 
                  onClick={() => handleReplyClick(conv)}
                  className="flex items-center gap-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white px-4 py-2 rounded transition-colors text-sm w-full sm:w-auto justify-center"
                >
                  <MailOutlined /> Reply to Conversation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      * REPLY MODAL *
      {replyModal && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            * Modal Header *
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

            * Modal Body *
            <div className="p-6">
              * Property info *
              <div className="bg-gray-50 p-4 rounded mb-4 border-l-4 border-gray-300">
                <p className="text-xs text-gray-500 mb-2">Property:</p>
                <p className="text-sm font-semibold text-gray-700">
                  {selectedConversation.ad?.address} - {selectedConversation.ad?.price}€
                </p>
              </div>

              * Recent messages *
              <div className="bg-blue-50 p-4 rounded mb-4 max-h-60 overflow-y-auto">
                <p className="text-xs text-gray-500 mb-3">Conversation history:</p>
                <div className="space-y-2">
                  {selectedConversation.messages.slice(-5).map((msg, idx) => (
                    <div key={idx} className="text-sm border-b border-blue-200 pb-2 last:border-0">
                      <span className="font-semibold text-[#244855]">
                        {msg.isOwn ? 'You' : (msg.sender?.name || 'Other')}:
                      </span>
                      <p className="ml-2 text-gray-700 mt-1">"{msg.message}"</p>
                      <span className="text-xs text-gray-500">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('fi-FI') : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              * Reply form *
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

                * Action buttons *
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
                    <MailOutlined />
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
}*/