// resources/js/Pages/Header.jsx
import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../css/Header.css";

const Header = () => {
    const { auth } = usePage().props;
    const user = auth.user;

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
                    
                    {user ? (
                        <>
                            <span className="welcome-text">
                                Hello, {user.name}
                                {user.role === 'admin' && ' (Admin)'}
                            </span>
                            
                            {user.role === 'admin' && (
                                <Link href="/admin" className="nav-link admin-link">
                                    Admin Panel
                                </Link>
                            )}
                            
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="nav-button logout-button"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link href={route('login')} className="nav-button login-button">
                                Login
                            </Link>
                            <Link href={route('register')} className="nav-button register-button">
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