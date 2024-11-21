// resources/js/Pages/Header.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import "../../css/Header.css";

const Header = ({ user, loading, onLogout }) => {
    return (
        <header className="main-header">
            <div className="header-container">
                <Link href="/" className="logo">
                    AutoMarket
                </Link>
                
                <nav className="nav-menu">
                    <Link href="/listings" className="nav-link">
                        Listings
                    </Link>
                    
                    {loading ? (
                        <span className="loading">Loading...</span>
                    ) : user ? (
                        <>
                            <span className="welcome-text">Welcome, {user.name}</span>
                            {user.role === 'admin' && (
                                <Link href="/admin" className="nav-link admin-link">
                                    Admin Panel
                                </Link>
                            )}
                            <button onClick={onLogout} className="nav-button logout-button">
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