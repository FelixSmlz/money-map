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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 250)->nullable(false);
            $table->float('amount', 6, 2)->unsigned()->nullable(false);
            $table->date('date')->nullable(false);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->index('user_id');
            $table->foreignId('category_id')->constrained('categories');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
