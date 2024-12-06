<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Listings
Route::get('/listings', function () {
    return inertia('Listings');
})->name('listings');

// Individual listing details
Route::get('/listings/{vehicleTypeId}/{listingId}', function ($vehicleTypeId, $listingId) {
    return inertia('ListingDetails', [
        'vehicleTypeId' => $vehicleTypeId,
        'listingId' => $listingId,
    ]);
})->name('listing.details');

// Admin Dashboard - Now with middleware
Route::get('/admin', function () {
    return inertia('AdminDashboard');
})->middleware(['jwt:admin'])->name('admin');

// Auth routes remain the same
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('jwt')->name('logout');