import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MAP_STYLES, createCustomIcon } from '../utils/mapUtils';
import MapStyleSelector from './MapStyleSelector';
import '../styles/Map.css';

// Melbourne coordinates
const MELBOURNE_CENTER = [-37.8136, 144.9631];
const DEFAULT_ZOOM = 12;

const Map = ({ reviews }) => {
  const [currentStyle, setCurrentStyle] = useState('light');

  return (
    <div className="map-wrapper">
      <div className="map-controls">
        <MapStyleSelector 
          currentStyle={currentStyle} 
          setCurrentStyle={setCurrentStyle} 
          id="main-map-style"
        />
      </div>
      
      <MapContainer 
        center={MELBOURNE_CENTER} 
        zoom={DEFAULT_ZOOM} 
        className="map-container"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        
        <TileLayer
          attribution={MAP_STYLES[currentStyle].attribution}
          url={MAP_STYLES[currentStyle].url}
        />
        
        {reviews.map((review) => (
          <Marker 
            key={review.id} 
            position={[review.latitude, review.longitude]}
            icon={createCustomIcon(review.rating)}
          >
            <Popup>
              <div className="marker-popup">
                <h4>{review.shopName}</h4>
                <p>Rating: {review.rating}/5</p>
                <Link to={`/review/${review.id}`} className="popup-link">View Review</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 