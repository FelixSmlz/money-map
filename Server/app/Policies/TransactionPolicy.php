<?php

namespace App\Policies;

use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Auth\Access\Response;

class TransactionPolicy
{
    public function before(User $user): ?bool
    {
        return AuthController::isAdmin($user) ? true : null;
    }

    public function show(User $user, Transaction $transaction): Response
    {
        return $user->id === $transaction->user_id
            ? Response::allow()
            : Response::deny('You cannot view this transaction, as you do not own this transaction.');
    }

    public function update(User $user, Transaction $transaction): Response
    {
        return $user->id === $transaction->user_id
            ? Response::allow()
            : Response::deny('You cannot update this transaction, as you do not own this transaction.');
    }

    public function destroy(User $user, Transaction $transaction): Response
    {
        return $user->id === $transaction->user_id
            ? Response::allow()
            : Response::deny('You cannot delete this transaction, as you do not own this transaction.');
    }
}
