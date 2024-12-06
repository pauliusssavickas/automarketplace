<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register middleware aliases
        // Ensure that 'EncryptCookies' and 'AddQueuedCookiesToResponse' exist
        Route::aliasMiddleware('jwt', \App\Http\Middleware\JWTMiddleware::class);
        Route::aliasMiddleware('cookies.encrypt', \App\Http\Middleware\EncryptCookies::class);
        Route::aliasMiddleware('cookies.add', \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class);
    }
}
