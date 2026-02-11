import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import AdFeatures from './AdFeatures';
import { formatNumber } from '../../helpers/ad';

export default function AdCard({ ad, className }) {
  // Debug
  console.log('AdCard rendering:', {
    id: ad?._id,
    address: ad?.address,
    price: ad?.price,
    hasPhotos: !!ad?.photos?.[0]?.Location,
    photoUrl: ad?.photos?.[0]?.Location,
  });

  if (!ad) {
    console.error('AdCard: No ad data provided!');
    return null;
  }

  const badgeColor = ad?.action === 'Sell' ? '#90AEAD' : '#E64833';
  const imageUrl =
    ad?.photos?.[0]?.Location ||
    'https://via.placeholder.com/400x300?text=No+Image';
  const showDistance = !!(ad?.distanceKm && ad.distanceKm >= 0.5);

  return (
    <Link to={`/ad/${ad.slug}`} className="block w-full max-w-sm mx-auto group">
      <div
        className="relative rounded-xl shadow-lg overflow-hidden 
                   transition-all duration-300 
                   group-hover:scale-[1.03] group-hover:shadow-2xl
                   h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Badge with better positioning and transparency */}
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action}`}
          color={badgeColor}
          className="font-poiretOne text-sm md:text-base pr-3"
          style={{
            top: '8px',
            opacity: 0.95,
          }}
        />

        {/* Distance badge with improved styling */}
        {showDistance && (
          <div
            className="absolute top-2 left-2 
                          bg-[#90AEAD]/90 backdrop-blur-sm
                          text-white px-3 py-1.5 rounded-lg 
                          text-sm font-medium shadow-md
                          transition-all duration-300
                          group-hover:bg-[#90AEAD] font-baskervville"
          >
            📍 {ad.distanceKm.toFixed(1)} km
          </div>
        )}

        {/* Enhanced gradient overlay kortin alareunan tummuus*/}
        <div
          className="absolute inset-0 
                        bg-gradient-to-t from-[#244855]/40 via-[#244855]/5 to-transparent
                        transition-all duration-300
                        group-hover:from-[#244855]/70"
        ></div>

        {/* Content with enhanced styling */}
        <div
          className="absolute bottom-4 left-0 right-0 px-4 md:px-5 pt-5 pb-2 text-white
                        transform transition-transform duration-300
                        group-hover:translate-y-[-4px]"
        >
          {/* Price with enhanced visibility */}
          <h5
            className="font-poiretOne text-2xl font-semibold mb-2 
                         drop-shadow-lg
                         transition-colors duration-300"
          >
            {formatNumber(ad?.price)}€
          </h5>

          {/* Address with better truncation */}
          <h4
            className="font-poiretOne text-xl mb-2 line-clamp-1
                         drop-shadow-lg"
          >
            {ad?.address}
          </h4>

          {/* Description with subtle appearance */}
          <h5
            className="font-poiretOne text-lg mb-3 line-clamp-1
                         drop-shadow-md"
          >
            {ad.description}
          </h5>

          {/* Features with improved spacing and visibility - emoji icons via AdFeatures */}
          <div className="drop-shadow-lg text-[#FFFFFF] !important">
            <AdFeatures ad={ad} layout="spread" fontClass="font-poiretOne" />
          </div>
        </div>

        {/* Subtle shine effect on hover */}
        <div
          className="absolute inset-0 opacity-0 
                        group-hover:opacity-100 
                        bg-gradient-to-r from-transparent via-white/5 to-transparent
                        transform -translate-x-full group-hover:translate-x-full
                        transition-all duration-1000 pointer-events-none"
        ></div>
      </div>
    </Link>
  );
}
