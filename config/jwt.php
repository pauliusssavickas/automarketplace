<?php

return [
    'jwt_secret' => env('JWT_SECRET'),
    'jwt_ttl' => env('JWT_TTL', 60 * 24), // 24 hours in minutes
];