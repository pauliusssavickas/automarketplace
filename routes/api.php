<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\CommentController;

// API Routes for vehicle types, listings, and comments
Route::middleware('api')->group(function () {
    // Vehicle Types
    Route::apiResource('vehicle-types', VehicleTypeController::class);

    // Nested routes for Listings under a specific Vehicle Type
    Route::get('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'index']);
    Route::post('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'store']);
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'show']);
    Route::put('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'update']);
    Route::delete('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'destroy']);

    // Nested routes for Comments under a specific Listing
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'index']);
    Route::post('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'store']);
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'show']);
    Route::put('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'destroy']);
});

