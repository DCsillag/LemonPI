import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ReviewCard.css';

const ReviewCard = ({ review }) => {
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

  return (
    <div className="review-card">
      <h3>{review.shopName}</h3>
      <div className="rating">
        {renderStars(review.rating)}
        <span className="rating-text">{review.rating}/5</span>
      </div>
      <p className="location">{review.location}</p>
      <p className="excerpt">{review.content.substring(0, 100)}...</p>
      
      {/* Add the image if it exists - now below the excerpt */}
      {review.image && (
        <div className="review-card-image">
          <img src={review.image} alt={`Lemon tart from ${review.shopName}`} />
        </div>
      )}
      
      <Link to={`/review/${review.id}`} className="read-more">
        Read Full Review
      </Link>
    </div>
  );
};

export default ReviewCard; 