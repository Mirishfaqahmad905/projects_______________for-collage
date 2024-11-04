import React from 'react';
import './css/Footer.css';
import './css/Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo or Brand */}
        <div className="footer-logo">
          <h2>Your Brand</h2>
        </div>

        {/* About and Help Links */}
        <div className="footer-links">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="mailto:info@yourbrand.com">Email Us</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i></a>
            </li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i></a>
            </li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i></a>
            </li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>&copy; 2024 Your Brand. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
