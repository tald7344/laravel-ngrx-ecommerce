<?php

// use Illuminate\Routing\Route;

use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\User\MaintenanceController;
use App\Http\Controllers\Api\User\SettingsController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Support\Facades\Route;

// User Auth
Route::post('login', [AuthController::class, 'login']);
// Under Maintenance
Route::get('maintenance', [SettingsController::class, 'underMaintenance']);

//Here is the protected User Routes Group
Route::group(['middleware' => ['assign.guard:api', 'jwt.auth']], function() {
    Route::apiResource('user', UserController::class);
    Route::get('settings', [SettingsController::class, 'getSettings']);
//    Route::get('logout', [UserController::class, 'logout']);
    Route::get('dashboard', [UserController::class, 'dashboard']);
});

