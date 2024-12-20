<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;

class VehicleTypeController extends Controller
{
    public function index()
    {
        $vehicleTypes = VehicleType::withCount('listings')->get();
        return response()->json($vehicleTypes);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:vehicle_types,name',
            'fields' => 'required|array',
            'fields.*.name' => 'required|string',
            'fields.*.required' => 'required|boolean',
        ]);

        try {
            $vehicleType = VehicleType::create([
                'name' => $validated['name'],
                'fields' => $validated['fields'],
            ]);

            return response()->json($vehicleType, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create vehicle type'], 500);
        }
    }

    public function show($id)
    {
        $vehicleType = VehicleType::withCount('listings')->findOrFail($id);
        return response()->json($vehicleType);
    }

    public function update(Request $request, $id)
    {
        $vehicleType = VehicleType::withCount('listings')->findOrFail($id);
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:vehicle_types,name,' . $id,
            'fields' => 'sometimes|required|array',
            'fields.*.name' => 'required|string',
            'fields.*.required' => 'required|boolean',
        ]);

        try {
            // If there are listings and fields are being modified, validate field compatibility
            if ($vehicleType->listings_count > 0 && $request->has('fields')) {
                $existingFields = collect($vehicleType->fields);
                $newFields = collect($validated['fields']);
                
                // Ensure all required fields from existing listings are preserved
                $removedRequiredFields = $existingFields
                    ->filter(fn($field) => $field['required'])
                    ->pluck('name')
                    ->diff($newFields->pluck('name'));
                
                if ($removedRequiredFields->isNotEmpty()) {
                    return response()->json([
                        'error' => 'Cannot remove required fields while listings exist',
                        'fields' => $removedRequiredFields
                    ], 422);
                }
            }

            $vehicleType->update($validated);
            return response()->json($vehicleType, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update vehicle type'], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $vehicleType = VehicleType::withCount('listings')->findOrFail($id);
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($vehicleType->listings_count > 0) {
            return response()->json([
                'error' => 'Cannot delete vehicle type',
                'message' => 'There are ' . $vehicleType->listings_count . ' listings associated with this vehicle type.'
            ], 422);
        }

        try {
            $vehicleType->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete vehicle type'], 500);
        }
    }
}