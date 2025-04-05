// src/components/AdsList.jsx
import React, { useState, useEffect } from 'react';
import { getAds } from '@/api/adsService'; // Import getAds from the service file

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAds();
        setAds(data);
      } catch (err) {
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
    <ul>
      {ads.map((ad) => (
        <li key={ad.id}>{ad.title}</li> // Assuming each ad has an id and title
      ))}
    </ul>
  );
};

export default AdsList;
