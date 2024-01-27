<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => 1,
        ]);

        User::create([
            'name' => 'Trịnh Tuấn Đạt',
            'email' => 'dattt@hust.edu.vn',
            'password' => bcrypt('123456'),
            'role_id' => 2,
        ]);

        User::create([
            'name' => 'Vũ Thị Hương Giang',
            'email' => 'giangvth@hust.edu.vn',
            'password' => bcrypt('123456'),
            'role_id' => 2,
        ]);

        User::create([
            'name' => 'Nguyễn Mạnh Tuấn',
            'email' => 'tuannm@hust.edu.vn',
            'password' => bcrypt('123456'),
            'role_id' => 2,
        ]);

        User::create([
            'name' => 'Phạm Vân Anh',
            'email' => 'anh.pv204940@sis.hust.edu.vn',
            'password' => bcrypt('20204940'),
            'role_id' => 3,
        ]);
    }
}
