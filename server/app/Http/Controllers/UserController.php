<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'userName' => ['required', Rule::unique('users', 'userName')],
            'companyName' => 'required',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'f_name' => 'required',
            'l_name' => 'required',
            'password' => 'required|confirmed',
        ]);

        // Handle base64 image
        if ($request->has('companyLogo')) {
            $base64Image = $request->input('companyLogo');
            $imageData = base64_decode($base64Image);
            $fileName = uniqid() . '.jpg'; // Generate unique filename
            Storage::disk('public')->put('companyLogos/' . $fileName, $imageData);
            $formFields['companyLogo'] = $fileName; // Store filename in database
        } else {
            $formFields['companyLogo'] = 'no-Company-Logo';
        }

        $formFields['password'] = bcrypt($formFields['password']);
        $user = User::create($formFields);
        $token = $user->createToken('auth_token')->plainTextToken;
        if ($user) {
            return response()->json(['message' => 'Account created successfully', 'token' => $token, 'status' => 201]);
        } else {
            return response()->json(['message' => 'Something went wrong, please try again', 'status' => 500]);
        }
    }

    public function login(REQUEST $request)
    {
        $user = User::where('userName', $request->userName)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            //$request->session()->regenerate();
            return response()->json(['message' => 'logged in successfully', 'token' => $token, 'status' => 200]);
        }


        return response()->json(['message' => 'invalid cedintial', 'status' => 404]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response([
            'message' => 'Logged out sucesfully'
        ]);
    }
}
