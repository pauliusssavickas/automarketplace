import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react'; // Use Inertia's Link
import '../../css/Listings.css';

function Listings() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [listings, setListings] = useState([]);

    // Fetch vehicle types on page load
    useEffect(() => {
        axios.get('/api/vehicle-types')
            .then(response => {
                setVehicleTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicle types:', error);
            });
    }, []);

    // Fetch listings when a vehicle type is selected
    useEffect(() => {
        if (selectedVehicleType) {
            axios.get(`/api/vehicle-types/${selectedVehicleType}/listings`)
                .then(response => {
                    setListings(response.data);
                })
                .catch(error => {
                    console.error('Error fetching listings:', error);
                });
        }
    }, [selectedVehicleType]);

    return (
        <div className="listings-container">
            <header className="listings-header">
                <h1>Vehicle Listings</h1>
                <div className="vehicle-type-selector">
                    <label htmlFor="vehicle-type">Select Vehicle Type:</label>
                    <select id="vehicle-type" onChange={(e) => setSelectedVehicleType(e.target.value)}>
                        <option value="">-- Select Vehicle Type --</option>
                        {vehicleTypes.map(vehicleType => (
                            <option key={vehicleType.id} value={vehicleType.id}>{vehicleType.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            <section className="listings-grid">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <Link
                            key={listing.id}
                            href={`/listings/${selectedVehicleType}/${listing.id}`} // Use correct route structure
                            className="listing-card"
                        >
                            <h3>{listing.data.make} {listing.data.model}</h3>
                            <p>Year: {listing.data.year}</p>
                            <p>Engine: {listing.data.engine_size}</p>
                            <p>Seats: {listing.data.seats}</p>
                            <p>Storage Capacity: {listing.data.storage_capacity}</p>
                            <p>Weight: {listing.data.weight}</p>
                        </Link>
                    ))
                ) : (
                    <p>No listings available for this vehicle type.</p>
                )}
            </section>
        </div>
    );
}

export default Listings;
