import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import "../../css/Listings.css";

function ListingDetails({ vehicleTypeId, listingId }) {
    const [listing, setListing] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const [listingResponse, commentsResponse] = await Promise.all([
                    axios.get(`/api/vehicle-types/${vehicleTypeId}/listings/${listingId}`),
                    axios.get(`/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`),
                ]);

                setListing(listingResponse.data);
                setComments(commentsResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (vehicleTypeId && listingId) {
            fetchListingData();
        }
    }, [vehicleTypeId, listingId]);

    if (loading) {
        return (
            <div className="listings-container">
                <div className="container">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="listings-container">
                <div className="container">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="listings-container">
                <div className="container">
                    <p>Listing not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="listings-container">
            <header className="header">
                <div className="container">
                    <h1 className="logo">AutoMarket</h1>
                    <nav className="nav">
                        <Link href="/">Home</Link>
                        <Link href="/listings">Back to Listings</Link>
                    </nav>
                </div>
            </header>

            <div className="listings-container">
                <div className="listing-card">
                    {/* Display make and model prominently */}
                    <div className="div-uc"><h3>{listing.data.make || "Unknown Make"} {listing.data.model || "Unknown Model"}</h3></div>
                    <div className="details-grid">
                        {Object.entries(listing.data).map(([key, value]) => {
                            // Ensure key is a string
                            if (typeof key === "string") {
                                const capitalizedKey =
                                    key.charAt(0).toUpperCase() +
                                    key.slice(1).replace(/_/g, " ");
                                return (
                                    <p key={key}>
                                        <strong>{capitalizedKey}:</strong> {value}
                                    </p>
                                );
                            }
                            return null; // Skip invalid fields
                        })}
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment-card">
                                <p>
                                    <strong>User:</strong> {comment.user ? comment.user.name : 'Unknown'}
                                </p>
                                <p>{comment.content}</p>
                                <p>
                                    <small>{new Date(comment.created_at).toLocaleString()}</small>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No comments available for this listing.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ListingDetails;
