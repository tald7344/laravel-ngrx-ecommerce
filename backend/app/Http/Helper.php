<?php

    // admin helper function to call 'auth()->guard('admin')' guard direct
    if (!function_exists('admins')) {
        function admins() {
            return auth()->guard('admin');
        }
    }

    if (!function_exists('setting')) {
        function setting() {
            return \App\Models\Settings::orderBy('id', 'desc')->first();
        }
    }

    if (!function_exists('countries')) {
        function countries() {
            return \App\Models\Country::orderBy('id', 'desc')->first();
        }
    }

    // Call UploadController Directly
    if (!function_exists('up')) {
        function up() {
            return new \App\Http\Controllers\UploadController;
        }
    }

    // Validate Image Extension
    if (!function_exists('VImage')) {
        function VImage($extension = null) {
            if ($extension == null) {
                return 'image|mimes:jpg,jpeg,png,bmp,gif';
            } else {
                return 'image|mimes:' . $extension;
            }
        }
    }
