import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import ReviewCard from '../components/ReviewCard';
import reviewsData from '../data/reviews';
import '../styles/HomePage.css';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we're using the static data
    setReviews(reviewsData);
    
    // Get top 3 highest rated reviews for the featured section
    const topReviews = [...reviewsData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    setFeaturedReviews(topReviews);
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <section className="hero">
          <h1>Melbourne's Best Lemon Tarts</h1>
          <p>Discover the most delicious lemon tarts across Melbourne, reviewed and mapped for your convenience.</p>
        </section>

        <section className="map-section">
          <h2>Lemon Tart Map</h2>
          <p className="map-description">
            Explore our interactive map to find lemon tarts near you. Click on a marker to see details and read the full review.
          </p>
          <Map reviews={reviews} />
        </section>

        <section className="featured-reviews">
          <div className="featured-header">
            <h2>Featured Reviews</h2>
            <Link to="/reviews" className="view-all-link">View All Reviews</Link>
          </div>
          <div className="featured-grid">
            {featuredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 