<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\ListingPhoto;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ListingController extends Controller
{
    public function index($vehicle_type_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listings = $vehicleType->listings()->with('photos')->get();
        return response()->json($listings, 200);
    }

    public function store(Request $request, $vehicle_type_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $user = $request->user();

        $request->validate([
            'data' => 'required|array',
            'price' => 'nullable|numeric',
            'contact_number' => 'nullable|string',
            'description' => 'nullable|string',
            'photos.*' => 'image|max:5120' // max 5MB per photo
        ]);

        // Create the listing
        $listing = $vehicleType->listings()->create([
            'data' => $request->input('data'),
            'user_id' => $user->id,
            'price' => $request->input('price'),
            'contact_number' => $request->input('contact_number'),
            'description' => $request->input('description')
        ]);

        // Handle photo uploads
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $index => $photoFile) {
                $path = $photoFile->store('listings/' . $listing->id, 'public');
                
                ListingPhoto::create([
                    'listing_id' => $listing->id,
                    'photo_path' => $path,
                    'is_primary' => $index === 0 // First photo is primary
                ]);
            }
        }

        return response()->json($listing, 201);
    }

    public function show($vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()
            ->with('photos')
            ->findOrFail($listing_id);
        return response()->json($listing, 200);
    }

    public function update(Request $request, $vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()->findOrFail($listing_id);
        $user = $request->user();

        if ($listing->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'data' => 'required|array',
            'price' => 'nullable|numeric',
            'contact_number' => 'nullable|string',
            'description' => 'nullable|string',
            'photos.*' => 'image|max:5120' // max 5MB per photo
        ]);

        // Update listing details
        $listing->update([
            'data' => $request->input('data'),
            'price' => $request->input('price'),
            'contact_number' => $request->input('contact_number'),
            'description' => $request->input('description')
        ]);

        // Handle photo updates
        if ($request->hasFile('photos')) {
            // Remove existing photos
            $listing->photos()->delete();
            Storage::disk('public')->deleteDirectory('listings/' . $listing->id);

            // Upload new photos
            foreach ($request->file('photos') as $index => $photoFile) {
                $path = $photoFile->store('listings/' . $listing->id, 'public');
                
                ListingPhoto::create([
                    'listing_id' => $listing->id,
                    'photo_path' => $path,
                    'is_primary' => $index === 0 // First photo is primary
                ]);
            }
        }

        return response()->json($listing, 200);
    }

    public function destroy(Request $request, $vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()->findOrFail($listing_id);
        $user = $request->user();

        if ($listing->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Delete associated photos from storage
        Storage::disk('public')->deleteDirectory('listings/' . $listing->id);
        
        $listing->delete();

        return response()->json(null, 204);
    }
}