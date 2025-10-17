import { Badge } from "antd";
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
      {/* Muokkaa-nappi (päällimmäinen kerros) */}
      <Link
        to={`/user/ad/${ad.slug}`}
        className="absolute top-2 left-2 z-20 bg-white/80 backdrop-blur-sm text-gray-800 p-2 radius-lg shadow-md transition-all hover:bg-white"
        onClick={(e) => e.stopPropagation()} // Estää alla olevan linkin aktivoitumisen
        aria-label="Edit Ad"
      >
        <FaPencilAlt />
      </Link>

      {/* Kortin sisältö ja linkki katselusivulle (alla oleva kerros) */}
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

        {/* Status badge */}
        {ad?.sold && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
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
    </div>
  );
}