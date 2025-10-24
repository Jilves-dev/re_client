import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad, className }) {
  // Debug
  console.log("AdCard rendering:", {
    id: ad?._id,
    address: ad?.address,
    price: ad?.price,
    hasPhotos: !!ad?.photos?.[0]?.Location,
    photoUrl: ad?.photos?.[0]?.Location
  });

  if (!ad) {
    console.error("AdCard: No ad data provided!");
    return null;
  }

  const badgeColor = ad?.action === "Sell" ? "#90AEAD" : "#E64833";
  const imageUrl = ad?.photos?.[0]?.Location || 'https://via.placeholder.com/400x300?text=No+Image';
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
          className="font-Castoro text-sm md:text-base"
          style={{ 
            top: '8px',
            opacity: 0.95
          }}
        />

        {/* Distance badge with improved styling */}
        {showDistance && (
          <div className="absolute top-2 left-2 
                          bg-[#90AEAD]/90 backdrop-blur-sm
                          text-white px-3 py-1.5 rounded-lg 
                          text-sm font-medium shadow-md
                          transition-all duration-300
                          group-hover:bg-[#90AEAD]">
            📍 {ad.distanceKm.toFixed(1)} km
          </div>
        )}

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 
                        bg-gradient-to-t from-black/80 via-black/20 to-transparent
                        transition-all duration-300
                        group-hover:from-black/90"></div>
        
        {/* Content with enhanced styling */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white
                        transform transition-transform duration-300
                        group-hover:translate-y-[-4px]">
          
          {/* Price with enhanced visibility */}
          <h5 className="font-Castoro text-2xl font-bold mb-2 
                         drop-shadow-lg
                         transition-colors duration-300
                         group-hover:text-[#90AEAD]">
            {formatNumber(ad?.price)}€
          </h5>
          
          {/* Address with better truncation */}
          <h4 className="font-normal text-xl mb-2 line-clamp-1
                         drop-shadow-md">
            {ad?.address}
          </h4>

          {/* Description with subtle appearance */}
          <h5 className="font-Castoro text-base mb-3 line-clamp-1 
                         opacity-90">
            {ad.description}
          </h5>
          
          {/* Features with improved spacing and visibility - emoji icons via AdFeatures */}
          <div className="drop-shadow-lg text-[#FFFFFF] !important">
            <AdFeatures ad={ad} layout="spread" />
          </div>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 opacity-0 
                        group-hover:opacity-100 
                        bg-gradient-to-r from-transparent via-white/5 to-transparent
                        transform -translate-x-full group-hover:translate-x-full
                        transition-all duration-1000 pointer-events-none">
        </div>
      </div>
    </Link>
  );
}





{/*import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad, className }) {
  // Debug
  console.log("AdCard rendering:", {
    id: ad?._id,
    address: ad?.address,
    price: ad?.price,
    hasPhotos: !!ad?.photos?.[0]?.Location,
    photoUrl: ad?.photos?.[0]?.Location
  });

  if (!ad) {
    console.error("AdCard: No ad data provided!");
    return null;
  }

  const badgeColor = ad?.action === "Sell" ? "#90AEAD" : "#E64833";
  const imageUrl = ad?.photos?.[0]?.Location || 'https://via.placeholder.com/400x300?text=No+Image';

  const showDistance = !!(ad?.distanceKm && ad.distanceKm >= 0.5);

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

        {showDistance && (
          <div className="absolute top-2 left-2 bg-[#90AEAD]/90 text-white px-2 py-1 rounded text-sm">
            📍 {ad.distanceKm.toFixed(1)} km
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h5 className="font-Castoro text-xl mb-1 line-clamp-1">
            {formatNumber(ad?.price)}€
          </h5>
          <h4 className="font-normal text-2xl mb-2 line-clamp-1">
            {ad?.address}
          </h4>
          <h5 className="font-Castoro text-xl mb-1 line-clamp-1">
            {ad.description}
          </h5>
          <div className="text-white">
            <AdFeatures ad={ad} layout="spread" />
          </div>
        </div>
      </div>
    </Link>
  );
}*/}











/*import { Badge } from "antd";
import { Link } from "react-router-dom";
//import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";
//import { useCart } from "../../context/cart";
//import { FaEye, FaCartPlus } from "react-icons/fa";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad, className }) {
   const badgeColor = ad?.action === "Sell" ? "#90AEAD" : "#E64833";
   //const cardClassName = `${className} relative z-10`;
   const imageUrl = ad?.photos?.[0]?.Location || 'default-image.jpg';

    // DEBUG
    console.log("Ad:", ad?.address, "Distance:", ad?.distanceKm);

    // piilota etäisyys jos zero tai ei määritetty
    const showDistance = !!(ad?.distanceKm && ad.distanceKm >= 0.5);

    // DEBUG
    console.log("Show distance?", showDistance);

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

                  * Näytä etäisyys vain jos yli 0.5 km *
                  {showDistance && (
                    <div className="absolute top-2 left-2 bg-[#90AEAD]/90 text-white px-2 py-1 rounded text-sm">
                      📍 {ad.distanceKm.toFixed(1)} km
                    </div>
                  )}


                  * Gradient overlay *
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  * Content *
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h5 className="font-Castoro text-xl mb-1 line-clamp-1">{formatNumber(ad?.price)}€</h5>
                    <h4 className="font-normal text-2xl mb-2 line-clamp-1">
                      {ad?.address}
                    </h4>
                    * AdFeatures-komponentti tarvitsee todennäköisesti myös valkoiset ikonit/tekstit *
                    <div className="text-white">
                      <AdFeatures ad={ad} layout="spread" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          }*/


  {/*<div className="bg-[#f4debe] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] mb-6 mr-6 ml-6 h-full flex flex-col">
       <div className={cardClassName}> 
       <Link to={`/ad/${ad.slug}`}>
       <Badge.Ribbon 
        text={`${ad?.type} for ${ad?.action}`} 
        color={badgeColor}
        className="font-Castoro text-sm md:text-base"
        >
          <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              src={ad?.photos?.[0]?.Location || 'default-image.jpg'}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
            />
          </div>
      </Badge.Ribbon>
      </Link>

          <div className="p-4 flex-grow">
            <h5 className="font-Castoro text-xl mb-2 line-clamp-1">{formatNumber(ad?.price)}€</h5>

            <h4 className="font-bold text-2xl text-[#4d675a] mb-2">
              {ad?.address}
            </h4>

            <p className="text-gray-600 mb-4 line-clamp-2">
              <AdFeatures ad={ad} layout="spread" />
            </p>
          </div>
           </div>
    </div>*/}


      {/*<div className="flex">
        <button
          className="flex-1 bg-[#4d675a] hover:bg-blue-700 text-white py-2 px-4 flex items-center justify-center transition-colors"
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          <FaEye className="mr-2" /> View
        </button>

        <button
          className="flex-1 border border-[#4d675a] text-[#4d675a] hover:bg-primary hover:text-white py-2 px-4 flex items-center justify-center transition-colors"
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Added to cart");
          }}
        >
          <FaCartPlus className="mr-2" /> Add
        </button>
      </div>*/}


/*vanha;  import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad, className  }) {
  // Määritellään värit toiminnon mukaan const className = 'bg-custom-beige p-4 rounded-lg shadow-md';
  const badgeColor = ad?.action === "Sell" ? "#90AEAD " : "#E64833";
  const cardClassName = `${className} relative z-10`; // Lisää 'relative z-10'

  return (
    <div className={cardClassName}> 
      <Link to={`/ad/${ad.slug}`}>
        <Badge.Ribbon 
        text={`${ad?.type} for ${ad?.action}`} 
        color={badgeColor} 
        style={{ fontFamily: 'yeseva one', fontWeight: 'normal' }}
        className="font-yeseva-one text-sm md:text-base" 
        >
          <div className="card hoverable shadow-lg shadow-[#879c7d] rounded-md my-card pb-4 w-90 h-100"> 
            <img
              src={ad?.photos?.[0]?.Location || 'default-image.jpg'}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              className="w-full h-60 object-cover rounded-t-md" // Määritellään kuvan koko ja sovitus
              />
              <div className="card-body">
              <h3 className="font-yeseva-onetext-2xl pl-2 pt-6 pb-1 ">{formatNumber(ad?.price)}€</h3>
              <p className="font-yeseva-one text-md text-[#879c7d] pl-2 pb-2">{ad?.address}</p>
              <AdFeatures ad={ad} layout="spread" />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}*/

