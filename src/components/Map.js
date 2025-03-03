import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

// Add this at the top of the file, after imports
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ center, zoom }) => {
    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/api/reviews')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const createCustomIcon = (rating) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-content rating-${rating}" style="background-color: #F4CC01;">${rating}</div>`,
            iconSize: [40, 40],
        });
    };

    return (
        <div className="map-container">
            <MapContainer 
                center={center} 
                zoom={zoom} 
                scrollWheelZoom={true}
                className="map"
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution="&copy; Stadia Maps contributors"
                />
                {reviews.map(review => (
                    <Marker
                        key={review.id}
                        position={[review.latitude, review.longitude]}
                        icon={createCustomIcon(review.rating)}
                    >
                        <Popup>
                            <div className="map-popup">
                                <h3>{review.shopName}</h3>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                                    ))}
                                </div>
                                <Link to={`/review/${review.id}`} className="read-more">
                                    Read Review
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map; 