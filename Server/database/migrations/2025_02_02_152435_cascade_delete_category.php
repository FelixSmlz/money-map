<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable()->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->nullOnDelete();
        });

        Schema::table('budgets', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable()->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->nullOnDelete();
        });

        Schema::table('goals', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable()->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable(false)->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories');
        });

        Schema::table('budgets', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable(false)->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories');
        });

        Schema::table('goals', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreignId('category_id')->nullable(false)->change();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories');
        });
    }
};
