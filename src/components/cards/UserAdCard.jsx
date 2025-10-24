import { Link } from "react-router-dom";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatNumber } from "../../helpers/ad";

export default function UserAdCard({ ad }) {
  return (
    <div className="w-80 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link to={`/ad/${ad.slug}`}>
        <img
          src={ad.photos?.[0]?.Location || ad.photos?.[0]?.url || 'https://via.placeholder.com/320x240'}
          alt={ad.address}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Badge - Sold/Active */}
        <div className="mb-2">
          {ad.sold ? (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
              SOLD
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              ACTIVE
            </span>
          )}
        </div>

        {/* Address */}
        <Link to={`/ad/${ad.slug}`}>
          <h3 className="font-castoro text-lg text-[#244855] hover:text-[#90AEAD] transition-colors mb-2 line-clamp-2">
            {ad.address}
          </h3>
        </Link>

        {/* Price */}
        <p className="text-2xl font-bold text-[#E64833] mb-2">
          {formatNumber(ad.price)}€
        </p>

        {/* Details 
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          {ad.bedrooms && (
            <span>🛏️ {ad.bedrooms}</span>
          )}
          {ad.bathrooms && (
            <span>🚿 {ad.bathrooms}</span>
          )}
          {ad.carpark && (
            <span>🚗 {ad.carpark}</span>
          )}
        </div>*/}

        <div className="mb-4 text-[#244855]">
        <AdFeatures ad={ad} layout="start" />
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-gray-600 mb-4 pb-4 border-b">
          <span className="flex items-center gap-1">
            <EyeOutlined /> {ad.views || 0} views
          </span>
          <span className="flex items-center gap-1">
            ❤️ {ad.likes?.length || 0} likes
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Edit Button */}
          <Link
            to={`/user/ad/${ad.slug}`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#90AEAD] hover:bg-[#7a9a99] text-white rounded-lg transition-colors font-castoro"
          >
            <EditOutlined />
            Edit
          </Link>

          {/* View Button */}
          <Link
            to={`/ad/${ad.slug}`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#244855] hover:bg-[#1a3640] text-white rounded-lg transition-colors font-castoro"
          >
            <EyeOutlined />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}






{/*import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";
import { FaPencilAlt } from "react-icons/fa"; // Tuodaan kynä-ikoni

export default function UserAdCard({ ad }) {
  if (!ad) {
    return null;
  }

  const badgeColor = ad?.action === "Sell" ? "#90AEAD" : "#E64833";
  const imageUrl = ad?.photos?.[0]?.Location || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="relative w-full max-w-sm mx-auto group">
      * Muokkaa-nappi (päällimmäinen kerros) *
      <Link
        to={`/user/ad/${ad.slug}`}
        className="absolute top-2 left-2 z-20 bg-white/80 backdrop-blur-sm text-gray-800 p-2 radius-lg shadow-md transition-all hover:bg-white"
        onClick={(e) => e.stopPropagation()} // Estää alla olevan linkin aktivoitumisen
        aria-label="Edit Ad"
      >
        <FaPencilAlt />
      </Link>

      * Kortin sisältö ja linkki katselusivulle (alla oleva kerros) *
      <Link to={`/ad/${ad.slug}`} className="block">
        <div
          className="relative rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02] h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >

        <Badge.Ribbon 
          text={`${ad?.type} for ${ad?.action}`} 
          color={badgeColor}
          className="font-Castoro text-sm md:text-base"
        />

        * Status badge *
        {ad?.sold && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
            SOLD
          </div>
        )}

        * Gradient overlay *
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        * Content at bottom *
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h5 className="font-castoro text-xl mb-1 line-clamp-1">
            {formatNumber(ad?.price)}€
          </h5>
          <h4 className="font-normal text-2xl mb-2 line-clamp-1">
            {ad?.address}
          </h4>
          <div className="text-white">
            <AdFeatures ad={ad} layout="spread" />
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
}*/}