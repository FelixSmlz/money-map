<?php

namespace App\Policies;

use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Models\Expense;
use Illuminate\Auth\Access\Response;

class ExpensePolicy
{
    public function before(User $user): ?bool
    {
        return AuthController::isAdmin($user) ? true : null;
    }

    public function update(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id ? Response::allow() : Response::deny('You do not own this expense.');
    }

    public function show(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id ? Response::allow() : Response::deny('You do not own this expense.');
    }

    public function delete(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id ? Response::allow() : Response::deny('You do not own this expense.');
    }
}
