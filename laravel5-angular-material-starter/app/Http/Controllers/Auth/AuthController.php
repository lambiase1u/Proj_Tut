<?php

namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Webpatser\Uuid\Uuid;
use DateTime;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', 401);
            }
        } catch (\JWTException $e) {
            return response()->error('Could not create token', 500);
        }

        $user = Auth::user();

        return response()->success(compact('user', 'token'));
    }

    public function register(Request $request)
    {
        $date_Time = new \DateTime();
        $current_date = $date_Time->createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));
        $adult = ($current_date->format('Y') - 18) . '-' . $current_date->format('m') . '-' . $current_date->format('d');

        $this->validate($request, [
            'name' => 'required|min:3',
            'firstName' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'birthdate' => 'required|date|before:'.$adult
        ]);

        $user = new User();

        $user->id = Uuid::generate();
        $user->name = trim($request->name);
        $user->firstName = trim($request->firstName);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->birthdate = trim($request->birthdate);

        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->created(compact('user', 'token'));
    }
}

