<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // we use guard 'admin' because we take the token from admin login page
        Broadcast::routes(['middleware' => ['assign.guard:admin', 'jwt.auth'], 'prefix' => 'admin-api']);

        require base_path('routes/channels.php');
    }
}
