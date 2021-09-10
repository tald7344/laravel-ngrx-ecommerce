<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void {
        parent::setUp();
        Admin::create([
            'name' => 'Talal',
            'email' => 'tald2905@gmail.com',
            'password' => bcrypt('123')
        ]);
        User::create([
            'name' => 'mohannad',
            'email' => 'mohannad@live.com',
            'level' => 'user',
            'password' => bcrypt('123')
        ]);
    }

    // it need fix, (it's not work)
    public function test_get_all_users()
    {
        $credential = [
            'email' => 'tald2905@gmail.com',
            'password' => bcrypt('123')
        ];
        $headers = [];
        $token = auth()->guard('admin')->attempt($credential, true);
        $headers['Authorization'] = 'Bearer ' . $token->data;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token->data,
        ])->get('/admin-api/user');
        // $response = $this->get('http://localhost:8000/admin-api/user', $headers);
        // $response = $this->json('GET', 'http://localhost:8000/admin-api/user', $headers);
        $response->assertSuccessful();
    }
}
