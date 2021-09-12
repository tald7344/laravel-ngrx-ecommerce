<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\File;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UploadController extends Controller
{   
    /**
     * upload function to bring the path after uploading the file
     * Because the method parameters is going larger(longer) as 
     * ($request, $path, $upload_type='single', $delete_file = null, $new_name = null, $crud_type = []) 
     * we will replace it to array called $data
     * @return void
     */
    public function upload()
    {
        $fileName = request()->file_name;
        $file = request()->file('file');
        $path = request()->path;
        // dd('countries' == request()->path);

        // die();
        $allowedExtension = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
        $fileNameWithExtension = $file->getClientOriginalName();
        $fileNameWithoutExtension = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        $clientOriginalExtension = $file->getClientOriginalExtension();
        $fileSize = $file->getSize();
        $fileNameToStore = $fileName . '_' . time() . '.' . $clientOriginalExtension;

        // Check For Image Extension Allowed
        if (!in_array($clientOriginalExtension, $allowedExtension)) {
            return response()->json(['error' => 'Sorry This Image Extension Not Allowed'], Response::HTTP_BAD_REQUEST);
        }

        // Check If image size is bigger than 5 MB
        if (($fileSize / 1000) > 5000) {
            return response()->json(['error' => 'Image Size Must Be Less Than 5 MB'], Response::HTTP_BAD_REQUEST);
        }
        /*
        // Check if there is file uploaded and the file is single file only uploaded
        if (request()->hasFile('file') && request()->upload_type == 'single') {
            // Delete the old Image exists
            $delete_file = $fileName;
            $file_path_stored = request()->path;
            $fileNameWithDirectory = setting()->$delete_file; // structure : settings/imageName_090923.png
            switch($file_path_stored) {
                case 'settings':
                    $fileNameWithDirectory = setting()->$delete_file; // structure : settings/imageName_090923.png
                    break;
                case 'countries':
                    break;
                    
            }
            Storage::has('public/' . $fileNameWithDirectory) ? Storage::delete('public/' . $fileNameWithDirectory) : null;
            // Store the file with new name and bring image Url
        }
        */
        return request()->file('file')->storeAs($path, $fileNameToStore, 'public');
        
    }

    public function resetDropZoneSettings()
    {
        $fileName = request()->file_name;        
        $storedPath = request()->stored_path;
        // dd(Country::where('id', request()->id)->first());

        // check if there is be an image url to delete
        if (request()->has('imageUrl')) {
            $requestImageUrl = explode('/', request()->imageUrl);
            if (count($requestImageUrl) > 1) {      // image url is : settings/imageName_randomNumber.extImg
                $imageUrl = request()->imageUrl;
            } else {                                // image url is : imageName_randomNumber.extImg
                $imageUrl = $storedPath . '/' . request()->imageUrl;
            }


        // dd(Storage::has($imageUrl));

           // Delete the image
           Storage::has($imageUrl) ? Storage::delete($imageUrl) : null;
           switch($storedPath) {
                case 'settings' :
                    Settings::find(1)->update([$fileName => '']); // empty the logo field from settings table in database
                    break;
                case 'countries':
                    Country::where('id', request()->id)->update([$fileName => '']);
                    break;
           }
           return response()->json(['success' => 'Image Successfully Deleted', $fileName . 'URL' => $imageUrl], Response::HTTP_OK);
        }
    }
}
