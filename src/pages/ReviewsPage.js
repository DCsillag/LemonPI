import React, { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import reviewsData from '../data/reviews';
import '../styles/ReviewsPage.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('rating'); // Default sort by rating

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we're using the static data
    setReviews(reviewsData);
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating; // Sort by rating (highest first)
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date); // Sort by date (newest first)
    } else if (sortBy === 'name') {
      return a.shopName.localeCompare(b.shopName); // Sort alphabetically
    }
    return 0;
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="reviews-page">
      <div className="container">
        <section className="reviews-header">
          <h1>Lemon Tart Reviews</h1>
          <p>Discover our collection of the best lemon tarts across Melbourne.</p>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select" 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="rating">Highest Rated</option>
              <option value="date">Most Recent</option>
              <option value="name">Shop Name</option>
            </select>
          </div>
        </section>

        <section className="reviews-list">
          {sortedReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ReviewsPage; 