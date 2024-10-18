<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();  // Primary key

            // Foreign key referencing vehicle_types
            $table->unsignedBigInteger('vehicle_type_id');
            $table->foreign('vehicle_type_id')->references('id')->on('vehicle_types')->onDelete('cascade');

            // Use JSON if supported, else fall back to text for compatibility
            $table->json('data')->nullable();  // JSON data for listing details

            // Foreign key referencing users
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();  // Timestamps (created_at, updated_at)
        });
    }

    public function down()
    {
        Schema::dropIfExists('listings');
    }
};