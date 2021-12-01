<?php

use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\ChangePasswordController;
use App\Http\Controllers\Api\Admin\CountriesController;
use App\Http\Controllers\Api\Admin\ResetPasswordController;
use App\Http\Controllers\Api\Admin\SettingController;
use App\Http\Controllers\Api\Admin\MessagesController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => ['assign.guard:admin', 'jwt.auth']], function() {
    Route::apiResource('admin', AdminController::class);
    Route::apiResource('user', UserController::class);    
    Route::put('userApprove', [UserController::class, 'approveUser']);
    // Settings
    Route::get('settings', [SettingController::class, 'settings']);
    Route::post('settings/save', [SettingController::class, 'saveSettings']);
    // Upload
    Route::post('upload', [UploadController::class, 'upload']);
    Route::post('upload/reset', [UploadController::class, 'resetDropZoneSettings']);
    // Countries
    Route::apiResource('countries', CountriesController::class);
    // Messages
    Route::post('messages', [MessagesController::class, 'sendMessage']);
    Route::post('messageDirect', [MessagesController::class, 'sendDirectMessage']);

    // Route::post('admin', [AdminController::class, 'store']);
    // Route::get('dashboard', 'Api\User\UserController@dashboard');
    Route::get('logout', [AdminAuthController::class, 'logout']);	// http://example.dev/api/auth/logout
    Route::post('me', [AdminAuthController::class, 'me']);
});

    Route::post('login', [AdminAuthController::class, 'login']);
    Route::post('sendPasswordRequestLink', [ResetPasswordController::class, 'sendEmail']);
    Route::post('changePassword', [ChangePasswordController::class, 'process']);
