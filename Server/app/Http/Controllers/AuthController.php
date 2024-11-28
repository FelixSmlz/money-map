<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{

    // Logout user

    public function logout(Request $request): JsonResponse
    {

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful',
            'user' => Auth::user()
        ], Response::HTTP_OK);
    }

    // Login user

    public function login(Request $request): JsonResponse
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'User already logged in',
                'user' => Auth::user()
            ], Response::HTTP_OK);
        }

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user()
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => 'Invalid login credentials'
        ], Response::HTTP_UNAUTHORIZED);
    }

    // Register user

    public function register(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'name' => 'required|string|max:250|',
            'email' => 'required|email|unique:users|max:250',
            'password' => 'required|confirmed|string|min:6|max:250|regex:/[0-9]/'
        ]);

        if (User::where('email', $credentials['email'])->exists()) {
            return response()->json([
                'message' => 'Email already exists'
            ], Response::HTTP_CONFLICT);
        }

        $credentials['password'] = bcrypt($credentials['password']);

        $user = User::create($credentials);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    // Get current user

    public function currentUser(): JsonResponse
    {
        return response()->json([
            'user' => Auth::user()
        ], Response::HTTP_OK);
    }

    // Delete account

    public function deleteAccount(): JsonResponse
    {
        $user = Auth::user();

        if (self::isAdmin($user)) {
            return response()->json([
                'message' => 'Admin account cannot be deleted'
            ], Response::HTTP_FORBIDDEN);
        }

        User::destroy($user->id);

        return response()->json([
            'message' => 'Account deleted'
        ], Response::HTTP_OK);
    }

    // Check if user is admin

    public static function isAdmin(User $user): bool
    {
        return strtolower($user->name) === strtolower('admin');
    }
}
