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
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 250)->nullable(false);
            $table->float('limit', 6, 2)->unsigned()->nullable(false);
            $table->float('current_amount', 6, 2)->unsigned()->nullable(true)->default(0);
            $table->date('start_date')->nullable(false)->default(now());
            $table->enum('period', ['daily', 'weekly', 'monthly', 'custom'])->nullable(false);
            $table->integer('custom_period')->nullable(true);
            $table->foreignId('category_id')->constrained('categories');
            $table->index('category_id');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
