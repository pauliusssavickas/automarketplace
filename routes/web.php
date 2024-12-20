<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Remove default Laravel auth routes
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return inertia('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return inertia('Auth/Register');
    })->name('register');
});

Route::get('/listings', function () {
    return inertia('Listings');
})->name('listings');

Route::get('/listings/{vehicleTypeId}/{listingId}', function ($vehicleTypeId, $listingId) {
    return inertia('ListingDetails', [
        'vehicleTypeId' => $vehicleTypeId,
        'listingId' => $listingId,
    ]);
})->name('listing.details');

Route::get('/admin', function () {
    return inertia('AdminDashboard');
})->middleware(['jwt:admin'])->name('admin');


Route::fallback(function () {
    return inertia('NotFound');
})->name('notfound');

Route::get('/{file}.php', function ($file) {
    return redirect('https://www.youtube.com/watch?v=xvFZjo5PgG0');
})->where('file', '.*');