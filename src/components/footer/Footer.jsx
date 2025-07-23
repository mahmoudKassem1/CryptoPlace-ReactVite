import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>CryptoPlace</h2>
        <p>Your gateway to the world of cryptocurrency markets.</p>
        
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-socials">
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-facebook"></i></a>
          <a href="#"><i className="fa-brands fa-discord"></i></a>
          <a href="#"><i className="fa-brands fa-linkedin"></i></a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} CryptoPlace. Mahmoud Kassem - portofolio projects .</p>
      </div>
    </footer>
  );
};

export default Footer;
