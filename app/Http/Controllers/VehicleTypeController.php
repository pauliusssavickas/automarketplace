<?php
/**
 * @OA\Info(
 *     title="AutoMarket API",
 *     version="1.0.0",
 *     description="API documentation for AutoMarket application.",
 *     @OA\Contact(
 *         email="support@automarket.com"
 *     ),
 * )
 */

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;

class VehicleTypeController extends Controller
{
    // Get all vehicle types
    /**
 * @OA\Get(
 *     path="/api/vehicle-types",
 *     summary="List all vehicle types",
 *     tags={"Vehicle Types"},
 *     @OA\Response(response=200, description="A list of vehicle types")
 * )
 */
    public function index()
    {
        return VehicleType::all();
    }

    // Create a new vehicle type with dynamic fields
    /**
 * @OA\Post(
 *     path="/api/vehicle-types",
 *     summary="Create a new vehicle type",
 *     tags={"Vehicle Types"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="name", type="string", example="Car"),
 *             @OA\Property(
 *                 property="fields",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="name", type="string", example="make"),
 *                     @OA\Property(property="required", type="boolean", example=true)
 *                 )
 *             ),
 *         )
 *     ),
 *     @OA\Response(response=201, description="Vehicle type created"),
 *     @OA\Response(response=422, description="Bad Request")
 * )
 */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string',
            'fields' => 'required|array',  // Expect an array of fields
        ]);

        try {
            // Create a new vehicle type
            $vehicleType = VehicleType::create([
                'name' => $validated['name'],
                'fields' => $validated['fields'],  // No need for json_encode
            ]);

            return response()->json($vehicleType, 201);  // Created
        } catch (\Exception $e) {
            // Return a JSON response for any unexpected errors
            return response()->json(['error' => 'Failed to create vehicle type'], 500);
        }
    }



    // Get a single vehicle type
    /**
 * @OA\Get(
 *     path="/api/vehicle-types/{id}",
 *     summary="Get a vehicle type by ID",
 *     tags={"Vehicle Types"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Vehicle type ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=200, description="Vehicle type details"),
 *     @OA\Response(response=404, description="Vehicle type not found")
 * )
 */
    public function show($id)
    {
        $vehicleType = VehicleType::findOrFail($id);
        return response()->json($vehicleType);
    }

    // Update an existing vehicle type
    /**
 * @OA\Put(
 *     path="/api/vehicle-types/{id}",
 *     summary="Update a vehicle type",
 *     tags={"Vehicle Types"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Vehicle type ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="name", type="string", example="Car"),
 *             @OA\Property(
 *                 property="fields",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="name", type="string", example="make"),
 *                     @OA\Property(property="required", type="boolean", example=true)
 *                 )
 *             ),
 *         )
 *     ),
 *     @OA\Response(response=200, description="Vehicle type updated"),
 *     @OA\Response(response=422, description="Bad request"),
 *     @OA\Response(response=404, description="Vehicle type not found")
 * )
 */
    public function update(Request $request, $id)
    {
        // Find the vehicle type by ID or fail
        $vehicleType = VehicleType::findOrFail($id);

        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'fields' => 'sometimes|required|array',  // Expect an array of fields
        ]);

        try {
            // Update name if provided
            if ($request->has('name')) {
                $vehicleType->name = $validated['name'];
            }

            // Update fields if provided
            if ($request->has('fields')) {
                $vehicleType->fields = $validated['fields'];  // Pass the array directly
            }

            // Save the updated vehicle type
            $vehicleType->save();

            return response()->json($vehicleType, 200);  // OK status
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update vehicle type'], 500);
        }
    }




    // Delete a vehicle type
    /**
 * @OA\Delete(
 *     path="/api/vehicle-types/{id}",
 *     summary="Delete a vehicle type",
 *     tags={"Vehicle Types"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Vehicle type ID",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(response=204, description="Vehicle type deleted"),
 *     @OA\Response(response=404, description="Vehicle type not found")
 * )
 */
    public function destroy($id)
    {
        $vehicleType = VehicleType::findOrFail($id);

        try {
            $vehicleType->delete();
            return response()->json(null, 204);  // No Content, deletion successful
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete vehicle type'], 500);
        }
    }

}

