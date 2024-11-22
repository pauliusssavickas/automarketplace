<?php
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

// Individual listing details
Route::get('/listings/{vehicleTypeId}/{listingId}', function ($vehicleTypeId, $listingId) {
    return inertia('ListingDetails', [
        'vehicleTypeId' => $vehicleTypeId,
        'listingId' => $listingId,
    ]);
})->name('listing.details');

// Admin Dashboard
Route::get('/admin', function () {
    $user = Auth::user();
    if ($user && $user->isAdmin()) {
        return inertia('AdminDashboard');
    }
    abort(403, 'Unauthorized access.');
})->name('admin');

// Auth routes remain the same
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});