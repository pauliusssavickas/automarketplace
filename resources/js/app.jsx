import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from '@Pages/Home';
import Listings from '@Pages/Listings';
import ListingDetails from '@Pages/ListingDetails';

const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);

    root.render(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Home page route */}
                <Route path="/listings" element={<Listings />} />  {/* Listings page route */}
                <Route path="/api/vehicle-types/:vehicleTypeId/listings/:listingId" element={<ListingDetails />} />  {/* Individual listing route */}
            </Routes>
        </Router>
    );
}
