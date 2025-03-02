import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} LemonPI - Melbourne's Lemon Tart Reviews
        </p>
        <p className="powered-by">
          Powered by <span className="raspberry">Raspberry Pi</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 