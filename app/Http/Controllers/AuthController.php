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
    protected $jwtService;

    public function __construct(JWTAuthService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid credentials'], 422);
        }

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $token = $this->jwtService->generateToken($user);
        $refreshToken = $this->jwtService->generateRefreshToken($user);

        return response()->json([
            'token' => $token,
            'refresh_token' => $refreshToken,
            'user' => $user,
        ], 200);
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
