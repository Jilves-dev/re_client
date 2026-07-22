import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
//import Logo from '../../logo.svg';
import Logo from '../assets/houseLogo2.jpg';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';

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
      <Link
        to={`/agent/${user.username}`}
        className="block w-full max-w-sm mx-auto group"
      >
        <div
          className="relative rounded-lg shadow-md overflow-hidden 
                        transition-all duration-300 
                        group-hover:scale-[1.03] group-hover:shadow-2xl
                        h-95 bg-cover bg-center"
        >
          <img
            src={user?.photo?.Location ?? Logo}
            //src={user?.photo?.Location}
            alt={user.username}
            className="w-full h-80 object-cover"
          />

          {/* Custom ribbon yläosassa */}
          <div className="absolute top-2 left-0 bg-[#90AEAD] text-white px-3 py-1 text-sm font-poiretOne z-10">
            {count} listings
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h5 className="font-poiretOne text-xl mb-1 line-clamp-1">
              {user?.name || user?.username}
            </h5>
            <h4 className="font-poiretOne font-normal text-lg mb-2 line-clamp-1 text-gray-200">
              Agent since {dayjs(user?.createdAt).format('YYYY')}
            </h4>
            <p className="font-poiretOne text-sm text-gray-300">
              {count} active listings
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

{
  /*import { useEffect, useState } from "react";
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
        <div className="relative rounded-xl shadow-lg overflow-hidden 
        transition-all duration-300 
        grouphover:scale-[1.03] group-hover:shadow-2xl 
        h-96 bg-cover bg-center">
          <img
            src={user?.photo?.Location ?? Logo}
            alt={user.username}
            className="w-full h-100 object-cover"
          />
          
          * Custom ribbon yläosassa 
          <div className="absolute top-2 left-0 bg-[#90AEAD] text-white px-3 py-1 text-sm font-Castoro z-10">
            {count} listings
          </div>
        
          * Gradient overlay *
          <div className="absolute inset-0 
                          bg-gradient-to-t from-[#244855]/60 
                          via-[#244855]/15 
                          to-transparent
                          transition-all duration-300
                          group-hover:from-[#244855]/70"></div>
          
          * Content *
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white
                          transform transition-transform duration-300
                          group-hover:translate-y-[-4px]">
            <h5 className="font-Castoro text-2xl font-bold mb-2 line-clamp-1
                           drop-shadow-lg transition-colors duration-300">
              {user?.name || user?.username}
            </h5>
            <h4 className="font-normal text-lg mb-2 line-clamp-1 
                           text-gray-200 drop-shadow-lg">
              Agent since {dayjs(user?.createdAt).format('YYYY')}
            </h4>
            <p className="text-sm text-gray-300 drop-shadow-lg">
              {count} active listings
            </p>
          </div>
              * Subtle shine effect on hover *
        <div className="absolute inset-0 opacity-0 
                        group-hover:opacity-100 
                        bg-gradient-to-r from-transparent via-white/5 to-transparent
                        transform -translate-x-full group-hover:translate-x-full
                        transition-all duration-1000 pointer-events-none">
        </div>
        </div>
      </Link>
    </div>
  );
}*/
}
