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
        $this->key = config('jwt.jwt_secret');
        $this->algorithm = 'HS256';
    }

    public function generateToken(User $user): string
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + (60 * 60), // 1 hour for access token
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role ?? 'user',
            ]
        ];

        return JWT::encode($payload, $this->key, $this->algorithm);
    }

    public function generateRefreshToken(User $user): string
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 7), // 7 days for refresh token
            'user' => [
                'id' => $user->id,
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
}
