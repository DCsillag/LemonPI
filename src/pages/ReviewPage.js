import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import reviewsData from '../data/reviews';
import { MAP_STYLES, createCustomIcon } from '../utils/mapUtils';
import MapStyleSelector from '../components/MapStyleSelector';
import '../styles/ReviewPage.css';

const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStyle, setCurrentStyle] = useState('light');

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we're using the static data
    const foundReview = reviewsData.find(r => r.id === parseInt(id) || r.id === id);
    setReview(foundReview);
    setLoading(false);
  }, [id]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!review) {
    return (
      <div className="container">
        <div className="review-not-found">
          <h2>Review Not Found</h2>
          <p>Sorry, we couldn't find the review you're looking for.</p>
          <Link to="/reviews" className="back-link">Back to All Reviews</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="review-page">
      <div className="container">
        <div className="navigation-links">
          <Link to="/" className="back-link">
            &larr; Back to Map
          </Link>
          <Link to="/reviews" className="back-link">
            &larr; Back to All Reviews
          </Link>
        </div>
        
        <article className="review-content">
          <header className="review-header">
            <h1>{review.shopName}</h1>
            <div className="review-meta">
              <div className="rating">
                {renderStars(review.rating)}
                <span className="rating-text">{review.rating}/5</span>
              </div>
              <p className="location">{review.location}</p>
              <p className="date">Reviewed on {review.date}</p>
            </div>
          </header>

          {review.image && (
            <div className="review-image">
              <img src={review.image} alt={`Lemon tart from ${review.shopName}`} />
            </div>
          )}

          <div className="review-body">
            {review.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="review-map-container">
            <h3>Location</h3>
            
            <div className="map-wrapper">
              <div className="map-controls">
                <MapStyleSelector 
                  currentStyle={currentStyle} 
                  setCurrentStyle={setCurrentStyle} 
                  id="review-map-style"
                />
              </div>
              
              <MapContainer 
                center={[review.latitude, review.longitude]} 
                zoom={15} 
                className="review-map"
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                
                <TileLayer
                  attribution={MAP_STYLES[currentStyle].attribution}
                  url={MAP_STYLES[currentStyle].url}
                />
                
                <Marker 
                  position={[review.latitude, review.longitude]}
                  icon={createCustomIcon(review.rating)}
                >
                  <Popup>
                    <div className="marker-popup">
                      <h4>{review.shopName}</h4>
                      <p>{review.location}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ReviewPage;