// Footer.jsx
import React from 'react';
import '../../css/Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h2 className="footer-logo">AutoMarket</h2>
          <p>&copy; {new Date().getFullYear()} AutoMarket. All rights reserved.</p>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/listings">Listings</a></li>
            <li><a href="/notfound">About Us</a></li>
            <li><a href="/notfound">Contact</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Facebook Icon */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#ffffff"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.326v21.348C0 23.406.594 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24h-1.919c-1.505 0-1.797.716-1.797 1.765v2.316h3.592l-.468 3.622h-3.124V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
              </svg>
            </a>

            {/* Twitter Icon */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#ffffff"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.933 4.933 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.384 4.482C7.69 7.69 4.066 5.13 1.64 1.671a4.92 4.92 0 0 0-.666 2.475c0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616c-.054 2.28 1.581 4.415 3.95 4.89a4.935 4.935 0 0 1-2.224.085 4.918 4.918 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.935 13.935 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
              </svg>
            </a>

            {/* Instagram Icon */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#ffffff"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.333 3.608 1.308.976.976 1.246 2.243 1.308 3.609.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.333 2.633-1.308 3.608-.976.976-2.243 1.246-3.609 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.976-.976-1.246-2.243-1.308-3.609C2.175 15.784 2.163 15.404 2.163 12s.012-3.584.07-4.849c.062-1.366.333-2.633 1.308-3.608C4.517 2.566 5.784 2.296 7.15 2.234 8.415 2.175 8.795 2.163 12 2.163zm0-2.163C8.756 0 8.343.012 7.052.07 5.746.128 4.557.39 3.582 1.366 2.607 2.342 2.345 3.531 2.287 4.837 2.228 6.128 2.216 6.541 2.216 12c0 5.459.012 5.872.07 7.163.058 1.306.32 2.495 1.296 3.471.976.976 2.165 1.238 3.471 1.296 1.291.058 1.704.07 7.163.07s5.872-.012 7.163-.07c1.306-.058 2.495-.32 3.471-1.296.976-.976 1.238-2.165 1.296-3.471.058-1.291.07-1.704.07-7.163s-.012-5.872-.07-7.163c-.058-1.306-.32-2.495-1.296-3.471C19.443.39 18.254.128 16.948.07 15.657.012 15.244 0 12 0z" />
                <path d="M12 5.838A6.163 6.163 0 1 0 18.163 12 6.167 6.167 0 0 0 12 5.838zm0 10.167A4.005 4.005 0 1 1 16.005 12 4.009 4.009 0 0 1 12 16.005z" />
                <circle cx="18.406" cy="5.595" r="1.44" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
