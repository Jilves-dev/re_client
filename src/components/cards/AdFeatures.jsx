export default function AdFeatures({ ad, layout }) {
  // Asetetaan oletusarvo layout-propille, jos sitä ei ole määritelty
  const justifyContentClass = layout === 'spread' ? 'justify-between' : 'justify-start';

  return (
    <div className={`flex ${justifyContentClass} items-center gap-3`}>
      {ad?.bedrooms && (
        <span className="flex items-center gap-1.5 text-xl">
          🛏️ {ad.bedrooms}
        </span>
      )}
      
      {ad?.bathrooms && (
        <span className="flex items-center gap-1.5 text-xl">
          🚿 {ad.bathrooms}
        </span>
      )}
      
      {ad?.carpark && (
        <span className="flex items-center gap-1.5 text-xl">
          🚗 {ad.carpark}
        </span>
      )}
      
      {ad?.landsize && (
        <span className="flex items-center gap-1.5 text-xl">
          📏 {ad.landsize}
        </span>
      )}
    </div>
  );
}





{/*import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

export default function AdFeatures({ ad, layout }) {
// Asetetaan oletusarvo layout-propille, jos sitä ei ole määritelty
const justifyContentClass = layout === 'spread' ? 'justify-between' : 'justify-start';

return (
  <div className={`flex ${justifyContentClass}`}>
    {ad?.bedrooms && (
      <span className="flex items-center">
        <IoBedOutline className="mr-2" /> {ad?.bedrooms}
      </span>
    )}
    {ad?.bathrooms && (
      <span className="flex items-center">
        <TbBath className="mx-2" /> {ad?.bathrooms}
      </span>
    )}
    {ad?.landsize && (
      <span className="flex items-center">
        <BiArea className="mx-2" /> {ad?.landsize}
      </span>
    )}
  </div>
  );
}*/}








/*import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

export default function AdFeatures({ ad }) {
  return (
    <p className="flex justify-between">
      {ad?.bedrooms ? (
        <span>
          <IoBedOutline /> {ad?.bedrooms}
        </span>
      ) : (
        ""
      )}

      {ad?.bathrooms ? (
        <span>
          <TbBath /> {ad?.bathrooms}
        </span>
      ) : (
        ""
      )}

      {ad?.landsize ? (
        <span>
          <BiArea /> {ad?.landsize}
        </span>
      ) : (
        ""
      )}
    </p>
  );
}*/