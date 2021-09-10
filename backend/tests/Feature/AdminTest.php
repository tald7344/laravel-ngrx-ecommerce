<?php

namespace Tests\Feature;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void {
        parent::setUp();
        Admin::create([
            'name' => 'Talal',
            'email' => 'talal@live.com',
            'password' => bcrypt('123')
        ]);
    }

    public function test_get_all_admin_user()
    {
        $response = $this->get('/admin/admin');
        $response->assertSuccessful();
    }

    public function test_successfully_admin_login() {
        $credential = [
            'email' => 'talal@live.com',
            'password' => '123'
        ]; 
        // define the route we work on 
        $response = $this->post('/admin/login', $credential);
        $response->assertSessionDoesntHaveErrors();
    }

    public function test_create_new_admin()
    {
        $admin = [
            'name' => 'talal',
            'email' => 'tal@gmail.com',
            'password' => '123'
        ];
        $headers = [];
        $token = auth()->guard('admin')->login(Admin::whereEmail('talal@live.com')->first());
        $headers['Authorization'] = 'Bearer ' . $token;
        
        $response = $this->json('POST', 'http://localhost:8000/admin-api/admin', $admin, $headers);

        $response->assertCreated();
    }

    public function test_get_admin_by_id()
    {
        $response = $this->get('http://localhost:8000/admin-api/admin/3');
        $response->assertSuccessful();
    }

}
