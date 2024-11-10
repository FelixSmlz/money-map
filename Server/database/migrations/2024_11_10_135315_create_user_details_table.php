<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('first_name', 50)->nullable(false);
            $table->string('last_name', 50)->nullable(false);
            $table->date('date_of_birth')->nullable(false);
            $table->string('phone_number', 15)->nullable(false);
            $table->string('address', 100)->nullable(false);
            $table->string('city', 50)->nullable(false);
            $table->string('state', 50)->nullable(false);
            $table->string('zip_code', 10)->nullable(false);
            $table->string('country', 50)->nullable(false);
            $table->string('profile_picture', 100)->nullable(true);
            $table->string('currency', 3)->nullable(false);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
