import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Header from "./Header";
import Footer from './Footer';
import "../../css/Home.css";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages = [
        '/images/carousel/car1.jpg',
        '/images/carousel/car2.jpg',
        '/images/carousel/car3.jpg',
        '/images/carousel/car4.jpg',
        '/images/carousel/car5.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => 
                prev === carouselImages.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (token) {
            fetch("/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Unauthorized');
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                    localStorage.removeItem("token");
                    setToken(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleLogout = () => {
        fetch("/api/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
        }).then(() => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        });
    };

    return (
        <div className="home-container">
            <Header user={user} loading={loading} onLogout={handleLogout} />

            <section className="hero">
                <div className="carousel">
                    {carouselImages.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ))}
                    <div className="carousel-content">
                        <h1>Welcome to AutoMarket</h1>
                        <p>Discover Luxury and Performance</p>
                        <Link href="/listings" className="cta-button">
                            Explore Vehicles
                        </Link>
                    </div>
                    <div className="carousel-indicators">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="features">
                <div>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚗</div>
                            <h3>Wide Selection</h3>
                            <p>Browse through our extensive collection of premium vehicles</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Trading</h3>
                            <p>Safe and secure transactions for peace of mind</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3>Expert Support</h3>
                            <p>Professional assistance throughout your journey</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about">
                <div>
                    <h2>About AutoMarket</h2>
                    <p>
                        AutoMarket is your premium destination for exceptional vehicles. 
                        We connect passionate car enthusiasts with their dream machines, 
                        offering a curated selection of luxury and performance vehicles.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;