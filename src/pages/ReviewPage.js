import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Map from '../components/Map';
import '../styles/ReviewPage.css';

const ReviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/reviews/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Review not found');
                }
                return response.json();
            })
            .then(data => {
                setReview(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error || !review) {
        return (
            <div className="error-container">
                <h2>Review Not Found</h2>
                <p>Sorry, we couldn't find the review you're looking for.</p>
                <button onClick={() => navigate('/reviews')} className="back-button">
                    Back to Reviews
                </button>
            </div>
        );
    }

    return (
        <div className="review-page">
            <div className="container">
                <h1>{review.shopName}</h1>
                <div className="review-content">
                    <div className="review-details">
                        <div className="review-image">
                            {review.image && <img src={review.image} alt={review.shopName} />}
                        </div>
                        <div className="review-info">
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="location">{review.location}</p>
                            <p className="date">{review.date}</p>
                            <p className="content">{review.content}</p>
                        </div>
                    </div>
                    <div className="map-container">
                        <Map 
                            center={[review.latitude, review.longitude]} 
                            zoom={15}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;