import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../css/Home.css";

const NotFound = () => {
    return (
        <div className="home-container">
            <Header />
            <section className="hero" style={{ textAlign: "center", padding: "100px 20px" }}>
                <h1>404 - Page Not Found</h1>
                <p style={{ marginTop: "20px", fontSize: "1.2em" }}>
                    Oops! The developer of this website was too lazy to add this page.
                </p>
            </section>
            <Footer />
        </div>
    );
};

export default NotFound;
