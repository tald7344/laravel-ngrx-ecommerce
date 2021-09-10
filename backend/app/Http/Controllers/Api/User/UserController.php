<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'Success' => 'Successfully Fetch All Users',
            'data' => $users
        ], Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:3',
            'level'     => 'required|in:user,company,vendor'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
        /*
            create will create new user and fill all columns as (create_at, update_at, ...)
            but if we user 'insert' instead will only insert the request field without (create_at, update_at, ...)
        */
        $user = User::create($request->all());
        if ( !$user ) {
            return response()->json([
                'error' => 'There is an error in creating new user, please try again.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
         }
        return response()->json([
            'success' => 'Successfully Created User',
            'data' => $user
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
        // check if there is user for specific id
        $user = User::find($id);
        if ( !$user ) {
            return response()->json([
                'error' => 'This id is wrong, Please insert a correct one'
            ], Response::HTTP_NOT_FOUND);
        }
        // dd($user);
        return response()->json([
            'success' => 'User Successfully Fetched',
            'data' => $user
        ], Response::HTTP_OK);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'level' => 'required|in:user,company,vendor'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
        $user = User::find($id);
        if ( !$user ) {
            return response()->json(['Error' => 'This ID ' . $id . ' is not exists'], Response::HTTP_NOT_FOUND);
        }
        $user->update($request->all());
        return response()->json([
            'success' => 'Successfully Update Data',
            'data' => $user
        ], Response::HTTP_OK);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function approveUser(Request $request)
    {

        $user = User::find($request->id);
        if ( !$user ) {
            return response()->json(['Error' => 'This ID ' . $request->id . ' is not exists'], Response::HTTP_NOT_FOUND);
        }
        // $approved = $request->approve ? 1 : 0;
        $user->update($request->all());
        // dd($user);
        return response()->json([
            'Success' => 'User Approved Successfully',
            'user' => $user
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
        $user = User::find($id);
        if ( !$user ) {
            return response()->json(['Error' => 'This ID ' . $id . ' is not exists'], Response::HTTP_NOT_FOUND);
        } 
        $user->delete();
        return response()->json(['success' => 'User Deleted Successfully'], Response::HTTP_OK);
    }
}
