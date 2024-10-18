<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    // Get all listings
    public function index()
    {
        return Listing::all();
    }

    // Create a new listing
    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'vehicle_type_id' => 'required|exists:vehicle_types,id',
            'data' => 'required|array',
            'user_id' => 'required|exists:users,id',
        ]);

        // Get the vehicle type
        $vehicleType = VehicleType::findOrFail($validated['vehicle_type_id']);

        // Define validation rules for fields inside 'data'
        $expectedFields = $vehicleType->fields;
        $rules = [];
        foreach ($expectedFields as $field) {
            $rules['data.' . $field['name']] = $field['required'] ? 'required' : 'nullable';
        }

        // Validate the 'data' fields
        $validatedData = $request->validate($rules);

        // Create the listing and pass the array directly
        $listing = Listing::create([
            'vehicle_type_id' => $vehicleType->id,
            'data' => $validatedData['data'],  // Pass the array directly without json_encode
            'user_id' => $validated['user_id'],
        ]);

        return response()->json($listing, 201);
    }


    // Show a specific listing
    public function show($id)
    {
        $listing = Listing::findOrFail($id);
        return response()->json($listing);
    }

    // Update a listing
    public function update(Request $request, $id)
{
    // Find the listing by ID
    $listing = Listing::findOrFail($id);

    // Validate the incoming data
    $validated = $request->validate([
        'vehicle_type_id' => 'required|exists:vehicle_types,id',
        'data' => 'required|array',
        'user_id' => 'required|exists:users,id',
    ]);

    // If validation passes, update the listing
    $listing->update($validated);

    return response()->json($listing);
}



    // Delete a listing
    public function destroy($id)
    {
        $listing = Listing::findOrFail($id);
        $listing->delete();

        return response()->json(null, 204);
    }
}

