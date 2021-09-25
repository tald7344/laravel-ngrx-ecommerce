<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    // return (int) $user->id === (int) $id;
    return true;
});


Broadcast::channel('channel-chat', function ($user) {
    return $user;
});

Broadcast::channel('channel-direct-message.{id}', function ($user, $id) {
    // Check if the auth user is the user that send direct message
    return (int) $user->id === (int) $id;
});