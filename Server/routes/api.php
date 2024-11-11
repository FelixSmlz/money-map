<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\UserDetailsController;
use Illuminate\Support\Facades\Route;

// Endpoints for transactions

Route::middleware('web', 'auth:sanctum')->controller(TransactionController::class)->group(function () {
    Route::get('transactions', 'index');
    Route::get('transactions/{id}', 'show');
    Route::post('transactions', 'store');
    Route::put('transactions/{id}', 'update');
    Route::delete('transactions/{id}', 'destroy');
});

// Endpoints for user details

Route::middleware(['web', 'auth:sanctum'])->controller(UserDetailsController::class)->group(function () {
    Route::get('user-details', 'index');
    Route::post('user-details', 'store');
    Route::put('user-details/{id}', 'update');
    Route::delete('user-details/{id}', 'destroy');
});

// Endpoints for budgets

Route::middleware(['web', 'auth:sanctum'])->controller(BudgetController::class)->group(function () {
    Route::get('budgets', 'index');
    Route::get('budgets/{id}', 'show');
    Route::post('budgets', 'store');
    Route::put('budgets/{id}', 'update');
    Route::delete('budgets/{id}', 'destroy');
});

// Endpoints for budgets

Route::middleware(['web', 'auth:sanctum'])->controller(GoalController::class)->group(function () {
    Route::get('goals', 'index');
    Route::get('goals/{id}', 'show');
    Route::post('goals', 'store');
    Route::put('goals/{id}', 'update');
    Route::delete('goals/{id}', 'destroy');
});

// Endpoints for categories

Route::middleware(['web', 'auth:sanctum'])->controller(CategoryController::class)->group(function () {
    Route::get('categories', 'index');
    Route::get('categories/{id}', 'show');
    Route::post('categories', 'store');
    Route::put('categories/{id}', 'update');
    Route::delete('categories/{id}', 'destroy');
});

// Endpoints for authentification

Route::middleware('web')->controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login')->name('login');
    Route::post('logout', 'logout')->middleware('auth:sanctum')->name('logout');
    Route::get('current-user', 'currentUser');
    Route::delete('delete-account', 'deleteAccount')->middleware('auth:sanctum');
});

Route::post('/cors', function () {
    return response()->json(['message' => 'Access allowed'], 200);
});

Route::fallback(function () {
    return '404 | Page not found';
});
