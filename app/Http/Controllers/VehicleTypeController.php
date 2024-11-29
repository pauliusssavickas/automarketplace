<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;

class VehicleTypeController extends Controller
{
    public function index()
    {
        return VehicleType::all();
    }

    public function store(Request $request)
    {
        $user = $request->user(); // Use the authenticated user

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'fields' => 'required|array',
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
        $vehicleType = VehicleType::findOrFail($id);
        return response()->json($vehicleType);
    }

    public function update(Request $request, $id)
    {
        $vehicleType = VehicleType::findOrFail($id);

        $user = $request->user(); // Use the authenticated user

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'fields' => 'sometimes|required|array',
        ]);

        try {
            if ($request->has('name')) {
                $vehicleType->name = $validated['name'];
            }

            if ($request->has('fields')) {
                $vehicleType->fields = $validated['fields'];
            }

            $vehicleType->save();

            return response()->json($vehicleType, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update vehicle type'], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $vehicleType = VehicleType::findOrFail($id);

        $user = $request->user(); // Use the authenticated user

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($vehicleType->listings()->exists()) {
            return response()->json(['error' => 'Cannot delete vehicle type. There are listings associated with it.'], 400);
        }

        try {
            $vehicleType->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete vehicle type'], 500);
        }
    }
}
