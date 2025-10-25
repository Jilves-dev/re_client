import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { 
  EyeOutlined, 
  HeartOutlined, 
  MessageOutlined, 
  DollarOutlined,
  HomeOutlined,
  CalendarOutlined 
} from "@ant-design/icons";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-castoro text-align:left text-6xl md:text-6xl xl:text-7xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

// Stat Card komponentti
const StatCard = ({ icon, title, value, subtitle, color, link }) => {
  const navigate = useNavigate(); // Lisää tämä Analytics komponentin alkuun

  const handleClick = () => {
    if (link?.startsWith('#')) {
      // Anchor link - scroll
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Normal link - navigate
      navigate(link);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow cursor-pointer ${color}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#244855] mb-2">{value}</p>
          {subtitle && (
            <p className="text-gray-500 text-xs">{subtitle}</p>
          )}
        </div>
        <div className={`text-4xl opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Property Performance Card
const PropertyCard = ({ ad }) => {
  console.log("Rendering PropertyCard:", ad); // Debug

  return (
    <Link to={`/user/property-analytics/${ad.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-[#90AEAD]">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src={ad.photos?.[0]?.Location || ad.photos?.[0]?.url || 'https://via.placeholder.com/100'} 
              alt={ad.address}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-castoro text-lg text-[#244855] truncate mb-1">
              {ad.address}
            </h3>
            <p className="text-[#E64833] font-semibold mb-2">
              {ad.price}€
            </p>
            
            {/* Stats */}
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <EyeOutlined /> {ad.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <HeartOutlined /> {ad.likesCount || ad.likes?.length || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageOutlined /> {ad.enquiries || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Analytics() {
  const [auth] = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      fetchAnalytics();
    }
  }, [auth?.token]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user-analytics");

       console.log("=== ANALYTICS DATA ===");
      console.log("Full response:", data);
      console.log("Total ads:", data.totalAds);
      console.log("Top ads count:", data.topAds?.length);
      console.log("Top ads:", data.topAds);

      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Analytics error:", err);
      console.error("Error response:", err.response?.data);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Analytics" />
        <Sidebar />
        <Spinner />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Analytics" />
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center">
            Unable to load analytics. Please try again.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Analytics" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="font-castoro text-2xl text-[#244855] mb-6">Overview</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<HomeOutlined />}
              title="Total Properties"
              value={stats.totalAds}
              subtitle={`${stats.activeAds} active, ${stats.soldAds} sold`}
              color="border-[#90AEAD]"
              link="/user/ads" // ← Uusi sivu: Kaikki ilmoitukset
            />

            <StatCard
              icon={<EyeOutlined />}
              title="Total Views"
              value={stats.totalViews}
              subtitle="Across all properties"
              color="border-[#E64833]"
              link="#top-properties"  // ✅ Scrollaa alas
              //link="/user/analytics/views" // ← Uusi sivu: Views breakdown
            />

            <StatCard
              icon={<HeartOutlined />}
              title="Total Likes"
              value={stats.totalLikes}
              subtitle="People interested"
              color="border-[#874F41]"
              link="#top-properties"  // ✅ Scrollaa alas
              //link="/user/analytics/likes" // ← Uusi sivu: Kuka tykkäsi mistä
            />

            <StatCard
              icon={<MessageOutlined />}
              title="Enquiries"
              value={stats.totalEnquiries}
              subtitle="Customer messages"
              color="border-[#244855]"
              link="/user/analytics/enquiries"
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="font-castoro text-2xl text-[#244855] mb-6">Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avg views per property */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-2">Avg Views per Property</p>
              <p className="text-3xl font-bold text-[#90AEAD]">
                {stats.avgViewsPerAd}
              </p>
            </div>

            {/* Conversion rate (enquiries / views) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-2">Enquiry Rate</p>
              <p className="text-3xl font-bold text-[#E64833]">
                {stats.enquiryRate}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Enquiries per 100 views</p>
            </div>

            {/* Like rate */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-2">Like Rate</p>
              <p className="text-3xl font-bold text-[#874F41]">
                {stats.likeRate}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Likes per 100 views</p>
            </div>
          </div>
        </div>

        {/* Top Performing Properties */}
        <div id="top-properties" className="mb-8">
          <h2 className="font-castoro text-2xl text-[#244855] mb-6">
            Top Performing Properties
          </h2>

          {/* Debug 
          <div className="mb-4 text-sm text-gray-600">
            Debug: {stats.topAds?.length || 0} properties found
          </div>*/}
          
         {stats.topAds && stats.topAds.length > 0 ? (
            <div className="space-y-4">
              {stats.topAds.map((ad) => (
                //console.log("Mapping ad:", ad._id, ad.address);
                <PropertyCard key={ad._id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 font-castoro">
                No properties yet. <Link to="/ad/create" className="text-[#90AEAD] hover:underline">Create your first property</Link>
              </p>
            </div>
          )}
        </div>

         {/* Recent Activity */}
        {stats.recentActivity && stats.recentActivity.length > 0 && (
          <div className="mb-8">
            <h2 className="font-castoro text-2xl text-[#244855] mb-6">
              Recent Activity
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'like' ? 'bg-red-100 text-red-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {activity.type === 'view' && <EyeOutlined />}
                      {activity.type === 'like' && <HeartOutlined />}
                      {activity.type === 'enquiry' && <MessageOutlined />}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#244855] font-medium">{activity.message}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
