/*import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function UserAdCard({ ad, className}) {
const userAdCardClassName = `${className} relative z-10`;
  return (
    <div className={userAdCardClassName}> 
      <Link to={`/user/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action}`}
          color={`${ad?.action === "Sell" ? "#90AEAD" : "#874F41"}`}
        >
          <div className="card hoverable shadow-lg shadow-gray-600 rounded-md my-card pb-4 w-90 h-100">
            <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              className="w-full h-80 object-cover"
            />

            <div className="card-body">
              <h3 className="text-2xl pl-2 pt-6 pb-1 font-semibold">{formatNumber(ad?.price)}€</h3>
              <p className="text-md text-gray-600 pl-2 pb-2">{ad?.address}</p>

              <AdFeatures ad={ad} />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}*/

import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function UserAdCard({ ad }) {
  if (!ad) {
    return null;
  }

  const badgeColor = ad?.action === "Sell" ? "#90AEAD" : "#E64833";
  const imageUrl = ad?.photos?.[0]?.Location || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link to={`/ad/${ad.slug}`} className="block w-full max-w-sm mx-auto">
      <div 
        className="relative rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <Badge.Ribbon 
          text={`${ad?.type} for ${ad?.action}`} 
          color={badgeColor}
          className="font-Castoro text-sm md:text-base"
        />

        {/* Status badge */}
        {ad?.sold && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
            SOLD
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Content at bottom */}
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
  );
}