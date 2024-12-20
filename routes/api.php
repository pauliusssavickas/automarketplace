<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Disable CSRF for API routes
Route::group(['middleware' => ['api']], function () {
    // Public access routes
    Route::get('vehicle-types', [VehicleTypeController::class, 'index']);
    Route::get('vehicle-types/{vehicle_type}', [VehicleTypeController::class, 'show']);
    Route::get('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'index']);
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'show']);
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'index']);
    Route::get('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'show']);

    // Authentication routes
    Route::post('/login', action: [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/refresh', [AuthController::class, 'refreshToken']);

    // Protected routes
    Route::middleware(['jwt:user,admin'])->group(function () {
        // User profile
        Route::get('/user', [UserController::class, 'profile']);
        
        // Listings
        Route::post('vehicle-types/{vehicle_type}/listings', [ListingController::class, 'store']);
        Route::put('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'update']);
        Route::delete('vehicle-types/{vehicle_type}/listings/{listing}', [ListingController::class, 'destroy']);

        // Comments
        Route::post('vehicle-types/{vehicle_type}/listings/{listing}/comments', [CommentController::class, 'store']);
        Route::put('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'update']);
        Route::delete('vehicle-types/{vehicle_type}/listings/{listing}/comments/{comment}', [CommentController::class, 'destroy']);
    });

    // Admin routes
    Route::middleware(['jwt:admin'])->group(function () {
        Route::post('vehicle-types', [VehicleTypeController::class, 'store']);
        Route::put('vehicle-types/{vehicle_type}', [VehicleTypeController::class, 'update']);
        Route::patch('vehicle-types/{vehicle_type}', [VehicleTypeController::class, 'update']);
        Route::delete('vehicle-types/{vehicle_type}', [VehicleTypeController::class, 'destroy']);
    });
});