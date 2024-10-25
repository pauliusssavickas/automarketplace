import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Home.css';

function Home() {
    return (
        <div>
            {/* Header Section */}
            <header className="header">
                <div className="container">
                    <h1 className="logo">AutoMarket</h1>
                    <nav className="nav">
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h2>Welcome to AutoMarket</h2>
                    <p>Your trusted marketplace for buying and selling cars.</p>
                    <Link to="/listings" className="btn">Browse Listings</Link> {/* Updated Link */}
                </div>
            </section>

            {/* Content Section */}
            <section className="content">
                <div className="container">
                    <h3>About Us</h3>
                    <p>AutoMarket is a leading online marketplace for car enthusiasts. Whether you're buying or selling, we provide a platform that connects buyers with sellers in the most efficient way possible.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;
