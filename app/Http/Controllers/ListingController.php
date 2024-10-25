<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    // Get all listings for a specific vehicle type
    /**
 * @OA\Get(
 *     path="/api/vehicle-types/{vehicleTypeId}/listings",
 *     summary="List all listings for a vehicle type",
 *     tags={"Listings"},
 *     @OA\Parameter(
 *         name="vehicleTypeId",
 *         in="path",
 *         required=true,
 *         description="Vehicle type ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="A list of listings")
 * )
 */
    public function index($vehicle_type_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);

        // Get all listings for the specific vehicle type
        $listings = $vehicleType->listings()->get();

        return response()->json($listings, 200);
    }

    // Create a new listing for a specific vehicle type
    /**
 * @OA\Post(
 *     path="/api/vehicle-types/{vehicleTypeId}/listings",
 *     summary="Create a listing under a vehicle type",
 *     tags={"Listings"},
 *     @OA\Parameter(
 *         name="vehicleTypeId",
 *         in="path",
 *         required=true,
 *         description="Vehicle type ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="data", type="object", description="Listing details")
 *         )
 *     ),
 *     @OA\Response(response=201, description="Listing created"),
 *     @OA\Response(response=422, description="Bad request"),
 *     @OA\Response(response=404, description="Vehicle type not found")
 * )
 */
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
    /**
 * @OA\Get(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}",
 *     summary="Get a single listing by ID",
 *     tags={"Listings"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Listing details"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Listing not found"
 *     )
 * )
 */

    public function show($vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);

        // Find the listing for this vehicle type
        $listing = $vehicleType->listings()->findOrFail($listing_id);

        return response()->json($listing, 200);
    }

    // Update a listing for a specific vehicle type
/**
 * @OA\Put(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}",
 *     summary="Update an existing listing",
 *     tags={"Listings"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="data", type="object", description="Listing details")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Listing updated successfully"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Listing not found"
 *     )
 * )
 */

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
    /**
 * @OA\Delete(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}",
 *     summary="Delete a listing",
 *     tags={"Listings"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Listing deleted successfully"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Listing not found"
 *     )
 * )
 */

    public function destroy($vehicle_type_id, $listing_id)
    {
        $vehicleType = VehicleType::findOrFail($vehicle_type_id);
        $listing = $vehicleType->listings()->findOrFail($listing_id);

        $listing->delete();

        return response()->json(null, 204);
    }

}

