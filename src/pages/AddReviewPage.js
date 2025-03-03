import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_CONFIG } from '../config/auth';
import '../styles/AddReviewPage.css';

const AddReviewPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shopName: '',
        location: '',
        latitude: '',
        longitude: '',
        rating: 5,
        image: null,
        content: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Password check
        if (formData.password !== AUTH_CONFIG.REVIEW_PASSWORD) {
            setError('Incorrect password');
            return;
        }

        // Validate coordinates
        const lat = parseFloat(formData.latitude);
        const lng = parseFloat(formData.longitude);
        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            setError('Please enter valid coordinates (latitude: -90 to 90, longitude: -180 to 180)');
            return;
        }

        try {
            const reviewData = {
                ...formData,
                latitude: lat,
                longitude: lng,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                id: Date.now()
            };

            delete reviewData.password;

            const response = await fetch('http://localhost:3001/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                throw new Error('Failed to save review');
            }

            navigate('/reviews');
        } catch (err) {
            setError('Failed to save review: ' + err.message);
        }
    };

    const renderStarInput = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= formData.rating ? 'filled' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: i }))}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Show preview
            setImagePreview(URL.createObjectURL(file));

            // Upload image
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:3001/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                setFormData(prev => ({
                    ...prev,
                    image: data.imageUrl.startsWith('http') ? data.imageUrl : `http://localhost:3001${data.imageUrl}`
                }));
            } catch (err) {
                setError('Failed to upload image: ' + err.message);
            }
        }
    };

    return (
        <div className="add-review-page">
            <div className="container">
                <h1>Add New Review</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="form-group">
                        <label htmlFor="shopName">Shop Name</label>
                        <input
                            type="text"
                            id="shopName"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Street Address</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter full street address"
                        />
                    </div>

                    <div className="form-group coordinates-group">
                        <div className="coordinate-input">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                id="latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                required
                                step="any"
                                placeholder="-37.8136"
                            />
                        </div>
                        <div className="coordinate-input">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="number"
                                id="longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                required
                                step="any"
                                placeholder="144.9631"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Rating</label>
                        <div className="star-rating">
                            {renderStarInput()}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Review Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            rows="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Add Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReviewPage; 