<?php

namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Webpatser\Uuid\Uuid;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
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
        $this->validate($request, [
            'name'       => 'required|min:3',
            'firstName'       => 'required|min:3',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
            'birthdate'  => 'required',
        ]);

        $user = new User;

        $user->id = Uuid::generate();
        $user->name = trim($request->name);
        $user->firstName = trim($request->firstName);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->birthdate = trim($request->birthdate);

        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }
}

//2f7e352b_8f22_4938_9200_94df9a2014f6
