<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\Admin;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ChangePasswordController extends Controller
{
    
    public function process(Request $request)
    {
        // Set Header To Allow Work With API
        $request->headers->set('Content-Type','application/json');
        // Validate The Request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:2|confirmed'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);            
        }
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();            
    }    
        
    // get table row from admins_password_resets table
    private function getPasswordResetTableRow($request)
    {        
        return DB::table('admins_password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    // Change Password
    private function changePassword($request)
    {
        $admin = Admin::whereEmail($request->email)->first();
        // Update admin password
        $admin->update(['password' => $request->password]);
        // login with new password
        $token = null;
        // dd($request->email, $request->password);
        try {
            if (! $token = admins()->attempt(['email' => $request->email, 'password' => $request->password], true)) {
                return response()->json(['error' => 'Email And Password Doesn\'t Exists'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could Not Create Token'], 500);
        }
        // Delete password reset row for this email
        $this->getPasswordResetTableRow($request)->delete();
        // Send Response With Token
        return $this->successResponseWithToken($token);
    }

    
    private function successResponseWithToken($token)
    {
        $token = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin')->factory()->getTTL() * 60,
        ];
        return response()->json([
            'success' => 'Password Successfully Changed',
            'token' => $token
        ], Response::HTTP_CREATED);
    }

    // Send Error Message
    public function tokenNotFoundResponse() {
        return response()->json([
            'error' => 'Token Or Email Is Incorrect'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

}
