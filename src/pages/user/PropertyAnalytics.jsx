import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { 
  EyeOutlined, 
  HeartOutlined, 
  MessageOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#874F41]">
    <div className="flex items-center pl-8">
      <h1 className="font-decomang text-align:left text-6xl md:text-6xl xl:text-8xl text-[#E64833]">
        {title}
      </h1>
    </div>
  </div>
);

export default function PropertyAnalytics() {
  const { slug } = useParams();
  const [auth] = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token && slug) {
      fetchPropertyAnalytics();
    }
  }, [auth?.token, slug]);

  const fetchPropertyAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/property-analytics/${slug}`);
      console.log("Property analytics:", data);
      setAnalytics(data);
      setLoading(false);
    } catch (err) {
      console.error("Property analytics error:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Property Analytics" />
        <Sidebar />
        <Spinner message="Loading property analytics..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className='w-full min-h-screen pb-10'>
        <PageHeader title="Property Analytics" />
        <Sidebar />
        <div className="flex justify-center items-center py-20">
          <h2 className="font-castoro text-center">
            Unable to load analytics. Please try again.
          </h2>
        </div>
      </div>
    );
  }

  const { ad, stats, dailyViews, recentActivity } = analytics;

  return (
    <div className='w-full min-h-screen pb-10 bg-[#FBE9D0]'>
      <PageHeader title="Property Analytics" />
      <Sidebar />

      <div className="container mx-auto px-4 py-10">
        {/* Back button */}
        <Link 
          to="/user/analytics" 
          className="inline-flex items-center gap-2 text-[#90AEAD] hover:text-[#7a9a99] mb-6 font-castoro"
        >
          <ArrowLeftOutlined /> Back to Analytics
        </Link>

         {/* Property Header *
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-6">
            * Image *
            <div className="w-48 h-48 flex-shrink-0">
              <img 
                src={ad.photos?.[0]?.Location || 'https://via.placeholder.com/200'} 
                alt={ad.address}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            * Info *
            <div className="flex-1">
              <h2 className="font-castoro text-3xl text-[#244855] mb-2">
                {ad.address}
              </h2>
              <p className="text-2xl text-[#E64833] font-bold mb-4">
                {ad.price}€
              </p>
              
              <div className="flex gap-6 text-sm text-gray-600">
                <div>
                  <span className="text-gray-500">Type:</span>{" "}
                  <span className="font-semibold">{ad.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Action:</span>{" "}
                  <span className="font-semibold">{ad.action}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className={`font-semibold ${ad.sold ? 'text-red-600' : 'text-green-600'}`}>
                    {ad.sold ? 'Sold' : 'Active'}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link 
                  to={`/ad/${ad.slug}`}
                  className="inline-block px-4 py-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg transition-colors"
                >
                  View Property
                </Link>
              </div>
            </div>
          </div>
        </div>*/}


        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Image */}
            <div className="w-full sm:w-48 h-48 flex-shrink-0">
              <img 
                src={ad.photos?.[0]?.Location || 'https://via.placeholder.com/200'} 
                alt={ad.address}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-castoro text-2xl sm:text-3xl text-[#244855] mb-2">
                {ad.address}
              </h2>
              <p className="text-xl sm:text-2xl text-[#E64833] font-bold mb-4">
                {ad.price}€
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-600 mb-4">
                <div>
                  <span className="text-gray-500">Type:</span>{" "}
                  <span className="font-semibold">{ad.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Action:</span>{" "}
                  <span className="font-semibold">{ad.action}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className={`font-semibold ${ad.sold ? 'text-red-600' : 'text-green-600'}`}>
                    {ad.sold ? 'Sold' : 'Active'}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link 
                  to={`/ad/${ad.slug}`}
                  className="inline-block w-full sm:w-auto text-center px-4 py-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg transition-colors"
                >
                  View Property
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-[#244855]">{stats.totalViews}</p>
              </div>
              <EyeOutlined className="text-4xl text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Likes</p>
                <p className="text-3xl font-bold text-[#244855]">{stats.totalLikes}</p>
              </div>
              <HeartOutlined className="text-4xl text-red-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Enquiries</p>
                <p className="text-3xl font-bold text-[#244855]">{stats.totalEnquiries}</p>
              </div>
              <MessageOutlined className="text-4xl text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Conversion</p>
                <p className="text-3xl font-bold text-[#244855]">
                  {stats.conversionRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Enquiries/Views</p>
              </div>
              <CalendarOutlined className="text-4xl text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Daily Views Chart 
        {dailyViews && dailyViews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-castoro text-xl text-[#244855] mb-4">
              Views Over Time (Last 30 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#90AEAD" 
                  strokeWidth={2}
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}*/}

        {/* Daily Views Chart */}
{dailyViews && dailyViews.length > 0 && (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
    <h3 className="font-castoro text-lg sm:text-xl text-[#244855] mb-4">
      Views Over Time (Last 30 Days)
    </h3>
    <div className="-mx-2 sm:mx-0">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={dailyViews}
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            width={35}
          />
          <Tooltip />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#90AEAD" 
            strokeWidth={2}
            name="Views"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)}

        {/* Recent Activity */}
        {recentActivity && recentActivity.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-castoro text-xl text-[#244855] mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
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
                    <p className="text-[#244855] font-medium">
                      {activity.userName || 'Anonymous'} {activity.type}ed this property
                    </p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}