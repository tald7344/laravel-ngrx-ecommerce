<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAdminRequest;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $adminUsers = Admin::all();
        return response()->json([
            'Success' => 'Successfully Fetch All Admin Users',
            'data' => $adminUsers
        ], 200);
        // return response()->json($adminUsers, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string',
            'email'     => 'required|email|unique:admins',
            'password'  => 'required|min:3'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
        $admin = Admin::create($request->all());
        if ( !$admin ) {
           return response()->json(
               ['error' => 'There is an error in creating new admin, please try again.'],
               Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json([
           'Success' => 'Successfully Create Admin',
           'data' => $admin
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param Admin $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Admin $admin)
    {
        return response()->json([
            'Success' => 'Admin Successfully Fetched',
            'data' => $admin
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Admin  $admin
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'string',
            // 'email'     => 'email|max:255|unique:admins,email,' . $admin->id,
            // 'password' => 'sometimes|nullable|min:3'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
        // if ($request->password) {
        //     $admin->password = $request->password;
        // }
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['Error' => 'This ID ' . $id . ' is not exists'], Response::HTTP_NOT_FOUND);
        }
        $admin->update($request->all());
        return response()->json([
            'Success' => 'Successfully Update Data',
            'data' => $admin
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Admin $admin
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $admin = Admin::find($id);
        $admin->delete();
        return response()->json(['Success' => 'Admin Deleted Successfully'], Response::HTTP_OK);
    }

    public function destroyAll($id)
    {
        if (!request('items')) {
            return response()->json(['error' => 'Please check records number'], Response::HTTP_BAD_REQUEST);
        }
        Admin::destroy(request('items'));
        return response()->json(['Success' => 'Successfully Deleted Items'], 200);
    }
}
