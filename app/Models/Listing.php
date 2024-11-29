<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = [
        'vehicle_type_id', 
        'data', 
        'user_id', 
        'price', 
        'contact_number', 
        'description'
    ];

    // Cast the data column as an array for easy handling of JSON
    protected $casts = [
        'data' => 'array',
        'price' => 'decimal:2'
    ];

    // Define the relationship: a Listing belongs to a VehicleType
    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Define the relationship: a Listing belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // New relationship for photos
    public function photos()
    {
        return $this->hasMany(ListingPhoto::class);
    }

    // Method to get primary photo

    public function primaryPhoto()
{
    return $this->hasOne(ListingPhoto::class)->where('is_primary', true)->withDefault();
}
}