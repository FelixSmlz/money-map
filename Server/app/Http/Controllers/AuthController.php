<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{

    public function logout(Request $request)
    {

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful',
            'user' => Auth::user()
        ], Response::HTTP_OK);
    }

    public function login(Request $request)
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

    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
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

    public function currentUser()
    {
        return response()->json([
            'user' => Auth::user()
        ], Response::HTTP_OK);
    }

    public static function isAdmin(User $user): bool
    {
        return strtolower($user->name) === strtolower('admin');
    }
}
