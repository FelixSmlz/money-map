<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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
        $user->phone = $request->phone;
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
        $user->fill($request->all());
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

    public function toggleNotifications()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $user->notifications_enabled = !$user->notifications_enabled;
        $user->save();
        return response()->json($user, Response::HTTP_OK);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if (!Hash::check($request->oldPassword, $user->password)) {
            return response()->json([
                'error' => 'Current password is incorrect'
            ], 401);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully'
        ], 200);
    }
}
