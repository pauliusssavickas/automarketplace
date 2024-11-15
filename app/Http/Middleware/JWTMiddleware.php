<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JWTAuthService;

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
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $payload = $this->jwtService->validateToken($token);
        
        if (!$payload) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        // Check roles if specified
        if (!empty($roles) && !in_array($payload->user->role, $roles)) {
            return response()->json(['error' => 'Insufficient permissions'], 403);
        }

        $request->auth = $payload;
        return $next($request);
    }
}