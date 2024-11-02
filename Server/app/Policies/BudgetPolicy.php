<?php

namespace App\Policies;

use App\Models\Budget;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BudgetPolicy
{

    public function show(User $user, Budget $budget): Response
    {
        return $user->id === $budget->user_id
            ? Response::allow()
            : Response::deny('You cannot view this budget, as you do not own this budget.');
    }

    public function update(User $user, Budget $budget): Response
    {
        return $user->id === $budget->user_id
            ? Response::allow()
            : Response::deny('You cannot update this budget, as you do not own this budget.');
    }

    public function delete(User $user, Budget $budget): Response
    {
        return $user->id === $budget->user_id
            ? Response::allow()
            : Response::deny('You cannot delete this budget, as you do not own this budget.');
    }
}
