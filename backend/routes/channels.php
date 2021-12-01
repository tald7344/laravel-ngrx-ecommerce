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


Broadcast::channel('chat', function ($user) {
    return $user;       // OR return true;
});


Broadcast::channel('channel-direct-message.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;               // $user->id === authUserId
});
