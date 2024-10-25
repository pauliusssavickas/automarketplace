<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    // Get all listings for a specific vehicle type
    public function index($vehicle_type_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);

        // Get all listings for the specific vehicle type
        $listings = $vehicleType->listings()->get();

        return response()->json($listings, 200);
    }

    // Create a new listing for a specific vehicle type
    public function store(Request $request, $vehicle_type_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);

        // Validate the request
        $validated = $request->validate([
            'data' => 'required|array',  // Validate the listing data
            'user_id' => 'required|exists:users,id',
        ]);

        // Create the new listing
        $listing = $vehicleType->listings()->create([
            'data' => $validated['data'],
            'user_id' => $validated['user_id'],
        ]);

        return response()->json($listing, 201);
    }

    // Get a single listing for a specific vehicle type
    public function show($vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);

        // Find the listing for this vehicle type
        $listing = $vehicleType->listings()->findOrFail($listing_id);

        return response()->json($listing, 200);
    }

    // Update a listing for a specific vehicle type
    public function update(Request $request, $vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()->findOrFail($listing_id);

        // Validate the request
        $validated = $request->validate([
            'data' => 'required|array',
        ]);

        // Update the listing data
        $listing->update([
            'data' => $validated['data'],
        ]);

        return response()->json($listing, 200);
    }

    // Delete a listing for a specific vehicle type
    public function destroy($vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()->findOrFail($listing_id);

        $listing->delete();

        return response()->json(null, 204);
    }

}

