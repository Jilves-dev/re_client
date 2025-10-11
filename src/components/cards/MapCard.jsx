 import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function MapCard({ ad }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    async: true,
  });

  const center = useMemo(() => ({
    lat: ad?.location?.coordinates?.[1] || 0,
    lng: ad?.location?.coordinates?.[0] || 0,
  }), [ad?.location?.coordinates]);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && window.google && window.google.maps && window.google.maps.marker) {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
      });
    }
  }, [map, center]);

  const onLoad = useCallback((mapInstance) => {
    mapInstance.setCenter(center);
    mapInstance.setZoom(12);
    setMap(mapInstance);
  }, [center]);

  return isLoaded ? (
    <div className="w-full h-96 relative">
      {/*<GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
        onLoad={onLoad}
      />*/}
      <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={12}
      onLoad={onLoad}
      options={{
        mapTypeControl: true, // Näyttää Kartta/Satelliitti-painikkeet
        mapTypeControlOptions: {
          position: window.google.maps.ControlPosition.TOP_LEFT, // Siirrä painikkeet oikeaan yläkulmaan
         // style: window.google.maps.MapTypeControlStyle.DEFAULT, // Käytä oletustyyliä
        },
      }}
    />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(MapCard);






/*import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { AdvancedMarkerElement } from '@googlemaps/marker';
import PropTypes from 'prop-types';

function MapCard({ ad }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    async: true,
  });

  const center = useMemo(() => ({
    lat: ad?.location?.coordinates?.[1] || 0,
    lng: ad?.location?.coordinates?.[0] || 0,
  }), [ad?.location?.coordinates]);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    //console.log("Map loaded");
    map.setCenter(center);
    map.setZoom(12);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!ad?.location?.coordinates) {
    return <div>No location data available</div>;
  }

  return isLoaded ? (
    <div className="w-full h-96">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <AdvancedMarkerElement position={center} />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
// Lisää prop-tyyppien validointi
MapCard.propTypes = {
  ad: PropTypes.shape({
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default React.memo(MapCard);*/

