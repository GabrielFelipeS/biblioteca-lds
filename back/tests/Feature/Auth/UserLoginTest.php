<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use WithFaker;

    public function test_de_login_com_credenciais_validas()
    {

        $user = User::factory()->create([
            'password' => bcrypt('@Teste123')
        ]);

        $data = [
            'email' => $user->email,
            'password' => '@Teste123'
        ];

        $response = $this->postJson('/api/login', $data);

        $user->delete();

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'token'
        ]);
    }
}
