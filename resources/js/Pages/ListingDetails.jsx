import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/Listings.css'; 

function ListingDetails() {
    const { vehicleTypeId, listingId } = useParams();  // Get vehicle type and listing ID from the URL
    const [listing, setListing] = useState(null);
    const [comments, setComments] = useState([]);

    // Fetch the listing details using vehicleTypeId and listingId
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/vehicle-types/${vehicleTypeId}/listings/${listingId}`)
            .then(response => {
                setListing(response.data);
            })
            .catch(error => {
                console.error('Error fetching listing:', error);
            });
    }, [vehicleTypeId, listingId]);

    // Fetch comments for the listing
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [vehicleTypeId, listingId]);

    if (!listing) {
        return <p>Loading...</p>;  // Show loading until the data is fetched
    }

    return (
        <div className="listings-container">
            {/* Reuse the header from other pages */}
            <header className="header">
                <div className="container">
                    <h1 className="logo">AutoMarket</h1>
                    <nav className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/listings">Back to Listings</Link>
                    </nav>
                </div>
            </header>

            <div className="container">
                {/* Display listing details */}
                <div className="listing-card">
                    <h3>{listing.data.make} {listing.data.model}</h3>
                    <p><strong>Year:</strong> {listing.data.year}</p>
                    <p><strong>Engine Size:</strong> {listing.data.engine_size}</p>
                    <p><strong>Seats:</strong> {listing.data.seats}</p>
                    <p><strong>Storage Capacity:</strong> {listing.data.storage_capacity}</p>
                    <p><strong>Weight:</strong> {listing.data.weight}</p>
                </div>

                {/* Display comments */}
                <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment-card">
                                <p><strong>User:</strong> {comment.user_id}</p>
                                <p>{comment.text}</p>
                                <p><small>{new Date(comment.created_at).toLocaleString()}</small></p>
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
