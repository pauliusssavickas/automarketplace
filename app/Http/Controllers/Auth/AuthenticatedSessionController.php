<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\JWTAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    private $jwtService;

    public function __construct(JWTAuthService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        // Extensive logging for debugging
        Log::channel('daily')->info('Login Attempt', [
            'email' => $request->input('email'),
            'ip' => $request->ip()
        ]);

        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();
        $token = $this->jwtService->generateToken($user);

        // Detailed logging of token generation
        Log::channel('daily')->info('Token Generated', [
            'user_id' => $user->id,
            'token' => $token,
            'user_role' => $user->role
        ]);

        // More comprehensive cookie creation
        $cookie = cookie(
            'jwt_token',
            $token,
            60,    // minutes
            '/',   // path
            null,  // domain
            env('APP_ENV') === 'production', // secure based on environment
            true,  // httpOnly
            false, // raw
            'Lax'  // SameSite
        );

        // Debugging response
        $response = response()->json([
            'token' => $token,
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ])->withCookie($cookie);

        // Log the full response headers
        Log::channel('daily')->info('Response Headers', [
            'headers' => $response->headers->all()
        ]);

        return $response;
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // CHANGED: Match the same attributes as when the cookie was set
        // and set a negative expiration to remove the cookie
        $expiredCookie = cookie(
            'jwt_token',
            '',     // empty value
            -1,     // negative expiration to remove the cookie
            '/',    // same path
            null,   // same domain (null)
            false,  // secure=false same as above
            true,   // httpOnly=true same as above
            false,  // raw=false same as above
            'Lax'   // SameSite=Lax same as above
        );

        return redirect('/')->withCookie($expiredCookie);
    }
}