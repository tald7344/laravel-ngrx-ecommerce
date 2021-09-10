<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminResetPassword;
use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    /*
    * Method TO Send Email to user
    *
    * params Request $request
    */
    public function sendEmail(Request $request)
    {
        // Check if the email is for our user and exsits in database
        if (!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    // Method TO Handle The Sending Email
    private function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new AdminResetPassword($token));
    }

    // Method To create random token
    private function createToken($email)
    {
        // Check if there is an old token
        $oldToken = DB::table('admins_password_resets')->where('email', $email)->first();
        if ($oldToken) {
            return $oldToken->token;
        }
        $token = \Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    // save token into database
    private function saveToken($token, $email)
    {
        DB::table('admins_password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    // validate email to check if the insert email is exists
    private function validateEmail($email) {
        // We Use [ !! ] to change the value to be boolean (true or false)
        return !!Admin::where('email', $email)->first();
    }

    // Send Success Message In Json Type
    private function successResponse()
    {
        return response()->json([
            'success' => 'Reset Password Email Sending Successfully'
        ], Response::HTTP_OK);
    }

    // Send Message In Json Type If There Is An Error
    public function failedResponse() {
        return response()->json([
            'error' => 'This Email doesn\'t Exists, please insert the register email'
        ], Response::HTTP_NOT_FOUND);
    }
}
