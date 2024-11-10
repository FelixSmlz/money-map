<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDetails;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserDetailsController extends Controller
{

    // Get user details

    public function index(Request $request)
    {
        $userDetails = UserDetails::where('user_id', Auth::id())->first();
        return response()->json(['user_details' => $userDetails], Response::HTTP_OK);
    }

    // Create user details

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'date_of_birth' => 'required|date|date_format:Y-m-d',
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'zip_code' => 'required|string|max:10',
            'country' => 'required|string|max:50',
            'profile_picture' => 'nullable|image',
            'currency' => 'required|string|max:3',
        ]);

        $user = Auth::user();

        $userDetails = new UserDetails();
        $userDetails->first_name = $request->first_name;
        $userDetails->last_name = $request->last_name;
        $userDetails->date_of_birth = $request->date_of_birth;
        $userDetails->phone_number = $request->phone_number;
        $userDetails->address = $request->address;
        $userDetails->city = $request->city;
        $userDetails->state = $request->state;
        $userDetails->zip_code = $request->zip_code;
        $userDetails->country = $request->country;
        $userDetails->currency = $request->currency;
        $userDetails->user_id = $user->id;

        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $profilePictureName = time() . '.' . $profilePicture->getClientOriginalExtension();
            $profilePicture->move(public_path('images'), $profilePictureName);
            $userDetails->profile_picture = $profilePictureName;
        }

        $userDetails->save();

        return response()->json(['user_details' => $userDetails], Response::HTTP_CREATED);
    }

    // Update user details

    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'date_of_birth' => 'required|date|date_format:Y-m-d',
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'zip_code' => 'required|string|max:10',
            'country' => 'required|string|max:50',
            'profile_picture' => 'nullable|image',
            'currency' => 'required|string|max:3',
        ]);

        $user = Auth::user();

        $userDetails = UserDetails::where('user_id', $user->id)->first();
        $userDetails->first_name = $request->first_name;
        $userDetails->last_name = $request->last_name;
        $userDetails->date_of_birth = $request->date_of_birth;
        $userDetails->phone_number = $request->phone_number;
        $userDetails->address = $request->address;
        $userDetails->city = $request->city;
        $userDetails->state = $request->state;
        $userDetails->zip_code = $request->zip_code;
        $userDetails->country = $request->country;
        $userDetails->currency = $request->currency;

        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $profilePictureName = time() . '.' . $profilePicture->getClientOriginalExtension();
            $profilePicture->move(public_path('images'), $profilePictureName);
            $userDetails->profile_picture = $profilePictureName;
        }

        $userDetails->save();

        return response()->json(['user_details' => $userDetails], Response::HTTP_OK);
    }

    // Delete user details

    public function destroy(Request $request)
    {
        $user = Auth::user();

        $userDetails = UserDetails::where('user_id', $user->id)->first();
        $userDetails->delete();

        return response()->json(['message' => 'User details deleted successfully'], Response::HTTP_OK);
    }
}