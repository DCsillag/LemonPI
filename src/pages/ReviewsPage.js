import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import '../styles/ReviewsPage.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    // Fetch reviews from the server
    fetch('http://localhost:3001/api/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []); // Empty dependency array means this runs once when component mounts

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="reviews-page">
      <div className="container">
        <h1>Reviews</h1>
        <div className="reviews-header">
          <div className="sort-and-add">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <Link to="/add-review" className="add-review-button">
              Add Review
            </Link>
          </div>
        </div>

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