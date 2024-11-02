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

    public function show(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id
            ? Response::allow()
            : Response::deny('You cannot view this expense, as you do not own this expense.');
    }

    public function update(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id
            ? Response::allow()
            : Response::deny('You cannot update this expense, as you do not own this expense.');
    }

    public function destroy(User $user, Expense $expense): Response
    {
        return $user->id === $expense->user_id
            ? Response::allow()
            : Response::deny('You cannot delete this expense, as you do not own this expense.');
    }
}