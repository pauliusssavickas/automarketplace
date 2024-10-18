<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;

class VehicleTypeController extends Controller
{
    // Get all vehicle types
    public function index()
    {
        return VehicleType::all();
    }

    // Create a new vehicle type with dynamic fields
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string',
            'fields' => 'required|array', // Expect an array of fields
        ]);

        // Create a new vehicle type, passing the array directly
        $vehicleType = VehicleType::create([
            'name' => $validated['name'],
            'fields' => $validated['fields'],  // No need for json_encode
        ]);

        return response()->json($vehicleType, 201);
    }


    // Get a single vehicle type
    public function show($id)
    {
        $vehicleType = VehicleType::findOrFail($id);
        return response()->json($vehicleType);
    }

    // Update an existing vehicle type
    public function update(Request $request, $id)
    {
        // Find the vehicle type by ID or fail
        $vehicleType = VehicleType::findOrFail($id);

        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'fields' => 'sometimes|required|array',  // Expect an array of fields
        ]);

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

        return response()->json($vehicleType);
    }



    // Delete a vehicle type
    public function destroy($id)
    {
        $vehicleType = VehicleType::findOrFail($id);
        $vehicleType->delete();

        return response()->json(null, 204);
    }
}

