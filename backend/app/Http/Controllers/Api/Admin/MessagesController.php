<?php

namespace App\Http\Controllers\Api\Admin;

use App\Events\ChatDirectMessageEvent;
use App\Events\ChatEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendMessage(Request $request)
    {
        // send event to all user but not to current user
        broadcast(new ChatEvent($request->message))->toOthers();

        return response()->json(['success' => 'Message Successfully Sent'], Response::HTTP_OK);

    }

    public function sendDirectMessage(Request $request)
    {
        $data = $request->only(['message', 'authUserId']);
        broadcast(new ChatDirectMessageEvent($data))->toOthers();
        return response()->json(['success' => 'Message Successfully Sent'], Response::HTTP_OK);
    }
}
