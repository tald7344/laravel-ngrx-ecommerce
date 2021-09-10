<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CountriesRequest;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CountriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $countries = Country::all();
       return response()->json([
        'Success' => 'Successfully Fetch All Countries',
        'data' => $countries 
       ], Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Country $country)
    {
        // validate the request
        $this->ValidatorRequest($request);
        
        $country = $country->create($request->all());    
        $country->update(['base_url' => url('storage')]);
        if ( !$country ) {
            return response()->json(
                ['error' => 'There is an error in creating new Country, please try again.'],
                Response::HTTP_INTERNAL_SERVER_ERROR);
         }
        return response()->json([
            'Success' => 'Successfully Created Countries',
            'data' => $country
        ], Response::HTTP_CREATED);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $country = Country::find($id);
        if (!$country) {
            return response()->json(['Error' => 'This id that equal to ' . $id . ' not exists, Please try again'], Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'Success' => 'Successfully Fetch Country Details',
            'data' => $country->first()
        ], Response::HTTP_CREATED);
    }
    
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // validate the request
        $this->ValidatorRequest($request);

        $country = Country::find($id);
        if (!$country) {
            return response()->json(['Error' => 'This id that equal to ' . $id . ' not exists, Please try again'], Response::HTTP_NOT_FOUND);
        }
        $country->update($request->all());
        return response()->json([
            'Success' => 'Successfully Update Data',
            'data' => $country
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $country = Country::find($id);
        if (!$country) {
            return response()->json(['Error' => 'This id that equal to ' . $id . ' not exists, Please try again'], Response::HTTP_NOT_FOUND);
        }
        $country->delete();
        return response()->json(['Success' => 'Country Deleted Successfully'], Response::HTTP_OK);
    }

    public function ValidatorRequest($request)
    {
        $validate = Validator::make($request->all(), [
            'countries_name_ar' => 'required',
            'countries_name_en' => 'required',
            'mob' => 'required',
            'code' => 'required',
            'logo' => 'sometimes|nullable|' . VImage()
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], Response::HTTP_BAD_REQUEST);
        }
        return true;
    }
}
