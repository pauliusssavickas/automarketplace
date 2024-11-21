import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"; // Reusable Header Component
import "../../css/Listings.css";

function Listings() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [listings, setListings] = useState([]);

    // Fetch vehicle types on page load
    useEffect(() => {
        axios
            .get("/api/vehicle-types")
            .then((response) => {
                setVehicleTypes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching vehicle types:", error);
            });
    }, []);

    // Fetch listings when a vehicle type is selected
    useEffect(() => {
        if (selectedVehicleType) {
            axios
                .get(`/api/vehicle-types/${selectedVehicleType}/listings`)
                .then((response) => {
                    setListings(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching listings:", error);
                });
        }
    }, [selectedVehicleType]);

    return (
        <div className="listings-container">
            <Header /> {/* Dynamic Header */}
            <header className="listings-header">
                <h1>Vehicle Listings</h1>
                <div className="vehicle-type-selector">
                    <label htmlFor="vehicle-type">Select Vehicle Type:</label>
                    <select
                        id="vehicle-type"
                        onChange={(e) => setSelectedVehicleType(e.target.value)}
                    >
                        <option value="">-- Select Vehicle Type --</option>
                        {vehicleTypes.map((vehicleType) => (
                            <option key={vehicleType.id} value={vehicleType.id}>
                                {vehicleType.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <section className="listings-grid">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <a
                            key={listing.id}
                            href={`/listings/${selectedVehicleType}/${listing.id}`}
                            className="listing-card"
                        >
                            <h3>
                                {listing.data.make || "Unknown Make"}{" "}
                                {listing.data.model || "Unknown Model"}
                            </h3>
                            {Object.entries(listing.data).map(([key, value]) => {
                                const capitalizedKey =
                                    key.charAt(0).toUpperCase() +
                                    key.slice(1).replace(/_/g, " ");
                                return (
                                    <p key={key}>
                                        <strong>{capitalizedKey}:</strong> {value}
                                    </p>
                                );
                            })}
                        </a>
                    ))
                ) : (
                    <p>No listings available for this vehicle type.</p>
                )}
            </section>
        </div>
    );
}

export default Listings;
