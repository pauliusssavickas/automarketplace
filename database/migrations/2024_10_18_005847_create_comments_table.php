<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('content');  // The comment content
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Reference to the user who created the comment
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');  // Reference to the listing this comment belongs to
            $table->timestamps();  // Timestamps (created_at, updated_at)
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
