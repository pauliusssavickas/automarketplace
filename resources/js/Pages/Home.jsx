import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react'; // Using Inertia.js's Link
import '../../css/Home.css';

const Home = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            // Fetch user data using the token
            fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                });
        }
    }, [token]);

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(() => {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        });
    };

    return (
        <div>
            <header className="header">
                <div className="container">
                    <h1 className="logo">AutoMarket</h1>
                    <nav className="nav">
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                        {!user ? (
                            <>
                                <Link href="/login" className="btn btn-login">Login</Link>
                                <Link href="/register" className="btn btn-register">Register</Link>
                            </>
                        ) : (
                            <>
                                <span className="user-name">Welcome, {user.name}</span>
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="btn btn-admin">Admin Panel</Link>
                                )}
                                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <h2>Welcome to AutoMarket</h2>
                    <p>Your trusted marketplace for buying and selling cars.</p>
                    <Link href="/listings" className="btn">Browse Listings</Link>
                </div>
            </section>

            <section className="content">
                <div className="container">
                    <h3>About Us</h3>
                    <p>
                        AutoMarket is a leading online marketplace for car enthusiasts. Whether you're buying or selling, we provide a platform that connects buyers with sellers in the most efficient way possible.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
