import { useEffect, useState } from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";
import dayjs from "dayjs";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function UserCard({ user, className }) {
  const [count, setCount] = useState(0);

  const userCardClassName = `${className || ''} relative z-10`;

  useEffect(() => {
    if (user?._id) fetchAdCount();
  }, [user?._id]);

  const fetchAdCount = async () => {
    try {
      const { data } = await axios.get(`/agent-ad-count/${user._id}`);
      setCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={userCardClassName}>
      <Link to={`/agent/${user.username}`}>
        <div className="relative rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-95 bg-cover bg-center">
          <img
            src={user?.photo?.Location ?? Logo}
            alt={user.username}
            className="w-full h-80 object-cover"
          />
          
          {/* Custom ribbon yläosassa */}
          <div className="absolute top-0 left-0 bg-[#90AEAD] text-white px-3 py-1 text-sm font-Castoro z-10">
            {count} listings
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h5 className="font-Castoro text-xl mb-1 line-clamp-1">
              {user?.name || user?.username}
            </h5>
            <h4 className="font-normal text-lg mb-2 line-clamp-1 text-gray-200">
              Agent since {dayjs(user?.createdAt).format('YYYY')}
            </h4>
            <p className="text-sm text-gray-300">
              {count} active listings
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}




{/*import { useEffect, useState } from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";
import dayjs from "dayjs";
import axios from "axios";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function UserCard({ user, className }) {
  const [count, setCount] = useState(0);

  const userCardClassName = `${className} relative z-10`;

  useEffect(() => {
    if (user?._id) fetchAdCount();
  }, [user?._id]);

  const fetchAdCount = async () => {
    try {
      const { data } = await axios.get(`/agent-ad-count/${user._id}`);
      setCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

   return (
      <div className={userCardClassName}>
       <Link to={`/agent/${user.username}`}>
        <div 
          className="relative rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-96 bg-cover bg-center">
           <img
              src={user?.photo?.Location ?? Logo}
              alt={user.username}
              className="w-full h-80 object-cover"
            />
          <Badge.Ribbon 
            text={`${count} listings`} 
            color="#90AEAD"
            className="font-Castoro text-sm md:text-base"
          />
          {/* Gradient overlay */}
        {/*}  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          {/* Content */}
         {/*} <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h5 className="font-Castoro text-xl mb-1 line-clamp-1">{formatNumber(ad?.price)}€</h5>
            <h4 className="font-normal text-2xl mb-2 line-clamp-1">
              {ad?.address}
            </h4>
            {/* AdFeatures-komponentti tarvitsee todennäköisesti myös valkoiset ikonit/tekstit */}
           {/*} <div className="text-white">
              <AdFeatures ad={ad} layout="spread" />
            </div>
          </div>
       
           </Badge.Ribbon>
          </Link>
        </div>
    );


  {/*return (
    <div className={userCardClassName}>
      <Link to={`/agent/${user.username}`}>
        <Badge.Ribbon 
          color="#90AEAD"
          text={`${count} listings`}>
          <div className="card hoverable shadow-lg shadow-gray-600 rounded-md my-card  w-90 h-100">
            <img
              src={user?.photo?.Location ?? Logo}
              alt={user.username}
              className="w-full h-80 object-cover"
            />

            <div className="card-body bg-[#FBE9D0]">
              <h3 className="text-2xl pl-2 pt-6 pb-1">{user?.name ?? user?.username}</h3>
              <p className="text-md text-gray-600 pl-2 pb-2">
                Joined {dayjs(user.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );*/}