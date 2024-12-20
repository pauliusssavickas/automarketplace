import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import "../../css/Header.css";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  
  const handleLogout = async () => {
    try {
        await axios.post('/api/logout', {}, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            withCredentials: true
        });

        // Clear all auth-related data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        // Redirect to home page or login page
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
        // Even if the API call fails, clear local storage
        localStorage.clear();
        window.location.href = '/';
    }
};

  return (
    <header className="main-header">
      <div className="header-container">
        <Link href="/" className="logo">
          AutoMarket
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-icon"></span>
        </button>

        <nav className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <Link href="/listings" className="nav-link">
            Listings
          </Link>

          {user ? (
            <>
              <span className="welcome-text">
                Hello, {user.name}
                {user.role === "admin" && " (Admin)"}
              </span>

              {user.role === "admin" && (
                <Link href="/admin" className="nav-link admin-link">
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="nav-button logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link href="/login" className="nav-button login-button">
                Login
              </Link>
              <Link href="/register" className="nav-button register-button">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
