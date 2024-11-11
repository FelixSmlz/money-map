<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\Transaction;

class UserController extends Controller
{

    // Get all users

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Create user

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json($user, Response::HTTP_CREATED);
    }

    // Get user by id

    public function show(string $id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    // Update user 

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->save();
        return response()->json($user, Response::HTTP_OK);
    }

    // Delete user

    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
