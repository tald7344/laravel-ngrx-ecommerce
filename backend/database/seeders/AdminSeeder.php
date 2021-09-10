<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Admin::factory(10)->create();
        DB::table('admins')->insert([
            'name' => 'Talal',
            'email' => 'tald2905@gmail.com',
            'password' => bcrypt('123')
        ]);
        DB::table('admins')->insert([
            'name' => 'Yara',
            'email' => 'yara@live.com',
            'password' => bcrypt('123')
        ]);
        DB::table('admins')->insert([
            'name' => 'Ahmad',
            'email' => 'ahmad@live.com',
            'password' => bcrypt('12345')
        ]);
    }
}
