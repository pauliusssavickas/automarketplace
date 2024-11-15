<?php
// routes/web.php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ListingController;
use Illuminate\Support\Facades\Route;

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Listings
Route::get('/listings', function () {
    return inertia('Listings'); 
})->name('listings');

// Individual listing details with vehicleTypeId and listingId
Route::get('/listings/{vehicleTypeId}/{listingId}', function ($vehicleTypeId, $listingId) {
    return inertia('ListingDetails', [
        'vehicleTypeId' => $vehicleTypeId,
        'listingId' => $listingId,
    ]);
})->name('listing.details');


// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
