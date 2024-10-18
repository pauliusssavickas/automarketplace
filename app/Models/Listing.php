<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = ['vehicle_type_id', 'data', 'user_id'];

    // Cast the data column as an array for easy handling of JSON
    protected $casts = [
        'data' => 'array',
    ];

    // Define the relationship: a Listing belongs to a VehicleType
    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }

    // Define the relationship: a Listing belongs to a User (if user management is implemented)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

