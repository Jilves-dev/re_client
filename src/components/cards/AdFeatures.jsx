export default function AdFeatures({ ad, layout, fontClass = "font-baskervville" }) {
  // Asetetaan oletusarvo layout-propille, jos sitä ei ole määritelty
  const justifyContentClass = layout === 'spread' ? 'justify-between' : 'justify-start';

  return (
    <div className={`flex ${justifyContentClass} items-center gap-3`}>
      {ad?.bedrooms && (
        <span className={`flex items-center gap-1.5 ${fontClass} text-xl font-normal`}>
          🛏️ {ad.bedrooms}
        </span>
      )}
      
      {ad?.bathrooms && (
        <span className={`flex items-center gap-1.5 ${fontClass} text-xl font-normal`}>
          🚿 {ad.bathrooms}
        </span>
      )}
      
      {ad?.carpark && (
        <span className={`flex items-center gap-1.5 ${fontClass} text-xl font-normal`}>
          🚗 {ad.carpark}
        </span>
      )}
      
      {ad?.landsize && (
        <span className={`flex items-center gap-1.5 ${fontClass} text-xl font-normal`}>
          📏 {ad.landsize}
        </span>
      )}
    </div>
  );
}