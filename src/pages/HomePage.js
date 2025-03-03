import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map';
import ReviewCard from '../components/ReviewCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const location = useLocation();

  const fetchReviews = () => {
    fetch('http://localhost:3001/api/reviews')
      .then(response => response.json())
      .then(data => {
        setReviews(data);
        // Get top 3 rated reviews for featured section
        const sorted = [...data].sort((a, b) => b.rating - a.rating);
        setFeaturedReviews(sorted.slice(0, 3));
      })
      .catch(error => console.error('Error fetching reviews:', error));
  };

  useEffect(() => {
    fetchReviews();
  }, [location.key]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>Melbourne's Best Lemon Tarts</h1>
          <p>Discover and review the finest lemon tarts across Melbourne</p>
        </div>
      </div>

      <div className="map-section">
        <div className="container">
          <h2>Explore Reviews</h2>
          <Map 
            center={[-37.8136, 144.9631]} 
            zoom={12}
          />
        </div>
      </div>

      <div className="featured-section">
        <div className="container">
          <h2>Featured Reviews</h2>
          <div className="featured-grid">
            {featuredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 