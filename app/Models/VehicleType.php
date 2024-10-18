<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = ['name', 'fields'];

    // Cast the fields column as an array for easy handling of JSON
    protected $casts = [
        'fields' => 'array',
    ];

    // Define the relationship: a VehicleType can have many Listings
    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}
