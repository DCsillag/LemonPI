const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const REVIEWS_FILE = path.join(__dirname, 'data', 'reviews.json');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

// Ensure the data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
}

// Initialize reviews file if it doesn't exist
async function initReviewsFile() {
    try {
        await fs.access(REVIEWS_FILE);
    } catch {
        await fs.writeFile(REVIEWS_FILE, '[]');
    }
}

// Get all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const data = await fs.readFile(REVIEWS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read reviews' });
    }
});

// Get a single review by ID
app.get('/api/reviews/:id', async (req, res) => {
    try {
        const data = await fs.readFile(REVIEWS_FILE, 'utf8');
        const reviews = JSON.parse(data);
        const review = reviews.find(r => r.id.toString() === req.params.id);
        
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read review' });
    }
});

// Add a new review
app.post('/api/reviews', async (req, res) => {
    try {
        console.log('Received review:', req.body);
        const data = await fs.readFile(REVIEWS_FILE, 'utf8');
        console.log('Current reviews:', data);
        const reviews = JSON.parse(data);
        const newReview = req.body;
        reviews.push(newReview);
        await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
        console.log('Review saved successfully');
        res.json(newReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Failed to save review: ' + error.message });
    }
});

// Add a new endpoint for image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }
    res.json({ 
        imageUrl: `http://localhost:3001/images/${req.file.filename}`
    });
});

// Initialize the server
async function init() {
    await ensureDataDir();
    await initReviewsFile();
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

init(); 