<?php

namespace App\Policies;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GoalPolicy
{

    public function show(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You cannot view this goal, as you do not own this goal.');
    }

    public function update(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You cannot update this goal, as you do not own this goal.');
    }

    public function delete(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You cannot delete this goal, as you do not own this goal.');
    }
}
