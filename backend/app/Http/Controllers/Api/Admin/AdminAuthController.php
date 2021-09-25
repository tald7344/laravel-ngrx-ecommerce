<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminAuthController extends Controller
{
    public function __construct()
    {
        $this->admin = new Admin();
        $this->middleware('auth:admin', ['except' => ['login']]);
    }

    public function login(AdminLoginRequest $request) {
        // Set Config Guard
        config()->set('auth.defaults.guard', 'admin');
        \Config::set('jwt.user', 'App\Models\Admin');
        \Config::set('auth.providers.admins.model', Admin::class);
        $credintials = $request->only('email', 'password');
        $remember_me = request('rememberme');
        $token = null;
        try {
            if (! $token = JWTAuth::attempt($credintials, $remember_me)) {
                return response()->json(['error' => 'Email And Password Doesn\'t Exists'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could Not Create Token'], 500);
        }
        return $this->responseWithToken($token);
//        return response()->json(compact('token'));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('admin')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        admins()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function responseWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'me' => auth('admin')->user(),
            'expires_in' => auth('admin')->factory()->getTTL() * 60,
        ]);
    }


}
