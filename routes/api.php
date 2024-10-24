<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\CommentController;
use App\Exceptions\Handler;

Route::middleware('api')->group(function () {
    Route::apiResource('vehicle-types', VehicleTypeController::class);
    Route::apiResource('listings', ListingController::class);

    Route::get('listings/{listingId}/comments', [CommentController::class, 'index']);
    Route::post('listings/{listingId}/comments', [CommentController::class, 'store']);
    Route::get('comments/{id}', [CommentController::class, 'show']);
    Route::put('comments/{id}', [CommentController::class, 'update']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);
});
