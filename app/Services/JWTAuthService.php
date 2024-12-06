<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class JWTAuthService
{
    private string $key;
    private string $algorithm;

    public function __construct()
    {
        $this->key = config('jwt.jwt_secret');
        $this->algorithm = 'HS256';
    }

    public function generateToken(User $user, int $expirationMinutes = 60): string
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + ($expirationMinutes * 60),
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role ?? 'user',
            ]
        ];

        return JWT::encode($payload, $this->key, $this->algorithm);
    }

    public function generateRefreshToken(User $user, int $expirationDays = 7): string
    {
        $payload = [
            'iss' => config('app.url'),
            'iat' => time(),
            'exp' => time() + ($expirationDays * 24 * 60 * 60),
            'user' => [
                'id' => $user->id,
            ]
        ];

        return JWT::encode($payload, $this->key, $this->algorithm);
    }

    public function validateToken(?string $token): ?\stdClass
    {
        // Extensive logging for token validation
        Log::channel('daily')->info('Token Validation Attempt', [
            'token_present' => $token ? 'Yes' : 'No',
            'token_length' => $token ? strlen($token) : 'N/A',
            'token_start' => $token ? substr($token, 0, 10) : 'N/A'
        ]);

        if (!$token) {
            Log::channel('daily')->warning('No token provided for validation');
            return null;
        }

        try {
            // Attempt to decode the token
            $decodedToken = JWT::decode($token, new Key($this->key, $this->algorithm));

            Log::channel('daily')->info('Token Validation Success', [
                'user_id' => $decodedToken->user->id ?? 'N/A'
            ]);

            return $decodedToken;

        } catch (ExpiredException $e) {
            Log::channel('daily')->warning('Token Expired', [
                'error_message' => $e->getMessage()
            ]);
            return null;
        } catch (\Exception $e) {
            Log::channel('daily')->error('Token Validation Failed', [
                'error_message' => $e->getMessage(),
                'token' => $token
            ]);
            return null;
        }
    }
}