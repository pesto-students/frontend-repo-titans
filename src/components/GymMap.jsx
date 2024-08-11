import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const center = {
  lat: 40.7128, // Default latitude
  lng: -74.0060 // Default longitude
};

const GymMap = ({ latitude, longitude }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: latitude || center.lat, lng: longitude || center.lng }}
        zoom={15}
      >
        {latitude && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GymMap;