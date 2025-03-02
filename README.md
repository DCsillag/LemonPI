# LemonPI

A website for reviewing lemon tarts in Melbourne, hosted on a Raspberry Pi with Nginx.

## Features

- Interactive map of Melbourne showing locations of reviewed lemon tarts
- Detailed reviews of lemon tarts from various locations
- Geolocation tagging for each review
- Individual pages for each review

## Technology Stack

- Frontend: React.js
- Map Library: Leaflet with React-Leaflet
- Routing: React Router
- Web Server: Nginx on Raspberry Pi

## Setup Instructions

### Development Environment

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`

### Production Deployment (Raspberry Pi with Nginx)

1. Build the production version:
   ```
   npm run build
   ```
2. Copy the contents of the `build` directory to your Nginx web server directory on the Raspberry Pi
3. Configure Nginx to serve the static files

## Nginx Configuration

Basic Nginx configuration for serving the React app:

```nginx
server {
    listen 80;
    server_name lemonpi.local;  # Change to your domain or IP

    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Project Structure

- `public/` - Static assets
- `src/` - Source code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `data/` - Data files for reviews
  - `styles/` - CSS and styling files 