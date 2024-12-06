<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\JWTAuthService;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class JWTMiddleware
{
    private $jwtService;

    public function __construct(JWTAuthService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Extensive debugging of token retrieval methods
        Log::channel('daily')->info('JWT Middleware Debug', [
            'cookies_all' => $request->cookies->all(),
            'cookies_jwt' => $request->cookie('jwt_token'),
            'header_cookie' => $request->header('cookie'),
            'bearer_token' => $request->bearerToken(),
        ]);

        // Multiple token extraction attempts
        $token = null;

        // Method 1: Direct cookie retrieval
        $token = $request->cookie('jwt_token');

        // Method 2: Parse cookie header manually
        if (!$token) {
            $cookieHeader = $request->header('cookie');
            if ($cookieHeader) {
                $cookies = explode('; ', $cookieHeader);
                foreach ($cookies as $cookie) {
                    if (strpos($cookie, 'jwt_token=') === 0) {
                        $token = substr($cookie, strlen('jwt_token='));
                        break;
                    }
                }
            }
        }

        // Method 3: Try bearer token
        if (!$token) {
            $token = $request->bearerToken();
        }

        // Detailed logging of token extraction
        Log::channel('daily')->info('Token Extraction Results', [
            'extracted_token' => $token ? 'Present' : 'Null',
            'token_length' => $token ? strlen($token) : 'N/A',
            'token_start' => $token ? substr($token, 0, 10) : 'N/A'
        ]);

        if (!$token) {
            Log::channel('daily')->warning('No JWT Token Found', [
                'request_path' => $request->path(),
                'request_method' => $request->method()
            ]);
            return $this->unauthorizedResponse($request);
        }

        try {
            // Validate the token
            $payload = $this->jwtService->validateToken($token);

            if (!$payload) {
                Log::channel('daily')->warning('Token Validation Failed', [
                    'token' => $token ? 'Present' : 'Null',
                    'token_length' => $token ? strlen($token) : 'N/A'
                ]);
                return $this->unauthorizedResponse($request);
            }

            // Find user
            $user = User::find($payload->user->id);

            if (!$user) {
                Log::channel('daily')->warning('User Not Found', [
                    'payload_user_id' => $payload->user->id
                ]);
                return $this->unauthorizedResponse($request);
            }

            // Role-based authorization
            if (!empty($roles) && !in_array($user->role, $roles)) {
                Log::channel('daily')->warning('Insufficient Permissions', [
                    'user_role' => $user->role,
                    'required_roles' => $roles
                ]);
                return $this->forbiddenResponse($request);
            }

            // Authenticate the user
            Auth::login($user);

            return $next($request);

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::channel('daily')->error('JWT Middleware Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->unauthorizedResponse($request);
        }
    }

    private function unauthorizedResponse(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        return redirect()->route('login')->with('error', 'Please log in to access this page.');
    }

    private function forbiddenResponse(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }
        abort(Response::HTTP_FORBIDDEN, 'You do not have permission to access this page.');
    }
}