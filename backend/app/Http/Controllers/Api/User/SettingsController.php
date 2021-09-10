<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use Symfony\Component\HttpFoundation\Response;

class SettingsController extends Controller {

    public function getSettings()
    {
        // get settings using helper setting function
        $settings = setting();
        return response()->json([
            'settings' => $settings
        ], Response::HTTP_OK);
    }

    public function underMaintenance()
    {
        $settings = setting();
        $status = $settings->status;
        $messageMaintenance = $settings->message_maintenance;
        // send id = 1 is for ngrx angular state managment that depending on that id should be exists
        return response()->json([
            'id' => 1,
            'status' => $status,
            'message' => $messageMaintenance
        ], Response::HTTP_OK);
    }
}