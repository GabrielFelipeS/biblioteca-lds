<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    public function test_de_login_com_credenciais_validas()
    {

        $user = User::create([
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => bcrypt('@Teste123')
        ]);

        $data = [
            'email' => $user->email,
            'password' => '@Teste1234'
        ];

        $response = $this->postJson('/api/login', $data);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'token'
        ]);
    }
}
