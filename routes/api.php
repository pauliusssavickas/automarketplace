<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;

// Public access routes (no middleware)
Route::get('vehicle-types', [VehicleTypeController::class, 'index']);
Route::get('vehicle-types/{vehicle_type}', [VehicleTypeController::class, 'show']); // Add this line
Route::get('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'index']);
Route::get('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'show']);
Route::get('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'index']);

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/refresh', [AuthController::class, 'refreshToken']);

// Protected routes for authenticated users
Route::middleware(['jwt:user,admin'])->group(function () {
    // Listings
    Route::post('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'store']);
    Route::put('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'update']);
    Route::delete('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'destroy']);

    // Comments
    Route::post('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'store']);
    Route::put('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'destroy']);
});

// Admin-only routes
Route::middleware(['jwt:admin'])->group(function () {
    Route::apiResource('vehicle-types', VehicleTypeController::class)->except(['index', 'show']);
});
