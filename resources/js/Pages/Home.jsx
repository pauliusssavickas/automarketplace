import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Header from "./Header";
import "../../css/Home.css";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // Fetch user data using the token
            fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    setLoading(false);
                });
        } else {
            setLoading(false); // No token, stop loading
        }
    }, [token]);

    const handleLogout = () => {
        fetch("/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        });
    };

    return (
        <div>
            <Header user={user} loading={loading} onLogout={handleLogout} />

            <section className="hero">
                <div className="container">
                    <h2>Welcome to AutoMarket</h2>
                    <p>Your trusted marketplace for buying and selling cars.</p>
                    <Link href="/listings" className="btn">
                        Browse Listings
                    </Link>
                </div>
            </section>

            <section className="content">
                <div className="container">
                    <h3>About Us</h3>
                    <p>
                        AutoMarket is a leading online marketplace for car
                        enthusiasts. Whether you're buying or selling, we
                        provide a platform that connects buyers with sellers in
                        the most efficient way possible.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
