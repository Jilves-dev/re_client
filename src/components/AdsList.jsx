import React, { useState, useEffect } from 'react';
import { getAds } from '@/api/adsService';

const AdsList = () => {
  const [ads, setAds] = useState({ adsForSell: [], adsForRent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        console.log("Fetching ads in AdsList component");
        const data = await getAds();
        console.log("Ads data received:", data);
        
        if (data && (data.adsForSell || data.adsForRent)) {
          setAds(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Data format error");
        }
      } catch (err) {
        console.error("AdsList error:", err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAds();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Properties for Sell ({ads.adsForSell?.length || 0})</h2>
      <ul>
        {ads.adsForSell?.map((ad) => (
          <li key={ad._id}>{ad.title} - {ad.price}€</li>
        ))}
      </ul>
      
      <h2>Properties for Rent ({ads.adsForRent?.length || 0})</h2>
      <ul>
        {ads.adsForRent?.map((ad) => (
          <li key={ad._id}>{ad.title} - {ad.price}€</li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;