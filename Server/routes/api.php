<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BudgetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(ExpenseController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('expenses/index', 'index');
        Route::get('expenses/get-by-id/{id}', 'show');
        Route::post('expenses/insert', 'store');
        Route::put('expenses/update/{id}', 'update');
        Route::delete('expenses/delete/{id}', 'destroy');
    });
});

// Route::controller(BudgetController::class)->group(function () {
//     Route::middleware('auth:sanctum')->group(function () {
//         Route::get('budget/get-all', 'index')->middleware('ability:get-all-budgets');
//         Route::get('budget/get-by-id/{id}', 'show')->middleware('ability:get-budget-by-id');
//         Route::get('user/get-by-user-id/{id}', 'showByUserId');->middleware('ability:get-budget-by-user-id');
//         Route::post('budget/insert/', 'store')->middleware('ability:create-budget');
//         Route::put('budget/update/{id}', 'update')->middleware('ability:update-budget');
//         Route::delete('budget/delete/{id}', 'destroy')->middleware('ability:delete-budget');
//     });
// });

Route::controller(UserController::class)->group(function () {
    Route::get('user/get-all', 'index');
    Route::get('user/get-by-id/{id}', 'show');
    Route::get('user/get-by-expense-id/{id}', 'getByExpenseId');
    Route::post('user/insert', 'store');
    Route::put('user/update/{id}', 'update');
    Route::delete('user/delete/{id}', 'destroy');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
});

Route::post('/cors', function () {
    return response()->json(['message' => 'Access allowed'], 200);
});

Route::fallback(function () {
    return 'Page not found';
});
