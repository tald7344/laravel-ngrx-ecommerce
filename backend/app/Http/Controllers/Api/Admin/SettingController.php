<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Settings as ModelsSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
{
    public function settings()
    {
        $settings = ModelsSettings::find(1);
        $settings->update(['base_url' => url('storage')]);
        return response()->json([
            'success' => 'Successfully Fetch Settings',
            'settings' => $settings
        ], Response::HTTP_OK);
    }

    public function saveSettings(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        $settings = ModelsSettings::orderBy('id', 'desc');
        $settings->update($data);
        return response()->json([
            'success' => 'Successfully Updated Settings',
            'settings' => $settings->first()
        ], Response::HTTP_OK);
    }
}
