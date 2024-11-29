<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('listings', function (Blueprint $table) {
            // Add new columns to the existing listings table
            $table->decimal('price', 10, 2)->nullable(); // Price with 2 decimal places
            $table->string('contact_number')->nullable(); // Contact number
            $table->text('description')->nullable(); // Description text
            
            // If you want to support multiple photos, create a separate photos table
            if (!Schema::hasTable('listing_photos')) {
                Schema::create('listing_photos', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('listing_id');
                    $table->string('photo_path');
                    $table->boolean('is_primary')->default(false);
                    $table->timestamps();

                    $table->foreign('listing_id')
                        ->references('id')
                        ->on('listings')
                        ->onDelete('cascade');
                });
            }
        });
    }
    public function down()
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->dropColumn(['price', 'contact_number', 'description']);
        });

        if (Schema::hasTable('listing_photos')) {
            Schema::dropIfExists('listing_photos');
        }
    }
};