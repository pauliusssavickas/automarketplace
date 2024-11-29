<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\JWTAuthService;
use App\Models\User;

class JWTMiddleware
{
    private $jwtService;

    public function __construct(JWTAuthService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle(Request $request, Closure $next, ...$roles)
    {
        $token = $request->bearerToken();

        if (!$token) {
            \Log::error('JWTMiddleware: No token provided');
            return $this->unauthorizedResponse($request);
        }

        $payload = $this->jwtService->validateToken($token);

        if (!$payload) {
            \Log::error('JWTMiddleware: Invalid token', ['token' => $token]);
            return $this->unauthorizedResponse($request);
        }

        $user = User::find($payload->user->id);

        if (!$user) {
            \Log::error('JWTMiddleware: User not found', ['user_id' => $payload->user->id]);
            return $this->unauthorizedResponse($request);
        }

        // Set the authenticated user
        Auth::login($user);

        // Role-based validation
        if (!empty($roles) && !in_array($user->role, $roles)) {
            \Log::error('JWTMiddleware: Insufficient permissions', [
                'user_role' => $user->role,
                'required_roles' => $roles,
            ]);
            return $this->forbiddenResponse($request);
        }

        return $next($request);
    }

    private function unauthorizedResponse($request)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return redirect()->route('login')->withErrors(['error' => 'Please log in first.']);
    }

    private function forbiddenResponse($request)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        abort(403, 'Unauthorized access.');
    }
}
