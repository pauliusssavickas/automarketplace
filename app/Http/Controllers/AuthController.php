<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\JWTAuthService;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private $jwtService;

    public function __construct(JWTAuthService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = Auth::user(); // Now $user should be a User object
        $token = $this->jwtService->generateToken($user);
        $refreshToken = $this->jwtService->generateRefreshToken($user);

        // Create HttpOnly, Lax cookie
        $cookie = cookie(
            'jwt_token',
            $token,
            60,          // minutes
            '/',         // path
            null,        // domain
            false,       // secure (false for local dev over http)
            true,        // httpOnly
            false,       // raw
            'Lax'        // SameSite
        );

        return response()->json([
            'token' => $token,
            'refresh_token' => $refreshToken,
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ])->withCookie($cookie);
    }

    public function register(Request $request)
    {
        $data = $request->only('name', 'email', 'password', 'password_confirmation');

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => 'user',
        ]);

        $token = $this->jwtService->generateToken($user);
        $refreshToken = $this->jwtService->generateRefreshToken($user);

        return response()->json([
            'token' => $token,
            'refresh_token' => $refreshToken,
            'user' => $user,
        ], 201);
    }

    public function refreshToken(Request $request)
    {
        $refreshToken = $request->input('refresh_token');

        $payload = $this->jwtService->validateToken($refreshToken);

        if (!$payload) {
            return response()->json(['error' => 'Invalid or expired refresh token'], 401);
        }

        $user = User::find($payload->user->id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $newToken = $this->jwtService->generateToken($user);
        $newRefreshToken = $this->jwtService->generateRefreshToken($user);

        return response()->json([
            'token' => $newToken,
            'refresh_token' => $newRefreshToken,
        ]);
    }
}
