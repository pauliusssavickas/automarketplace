<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;
use Illuminate\Support\Facades\Config;

class JWTAuthService
{
    private string $key;
    private string $algorithm;

    public function __construct()
    {
        //dd(config('jwt.jwt_secret'));
        $this->key = config('jwt.jwt_secret');
        $this->algorithm = 'HS256';
    }

    public function generateToken(User $user): string
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 hours
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role ?? 'user', // Default to 'user' if not set
            ]
        ];

        return JWT::encode($payload, $this->key, $this->algorithm);
    }

    public function validateToken(string $token): ?\stdClass
    {
        try {
            return JWT::decode($token, new Key($this->key, $this->algorithm));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function getUser($token): ?User
    {
        $payload = $this->validateToken($token);
        if (!$payload) return null;

        return User::find($payload->user->id);
    }
}