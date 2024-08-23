<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLogoutTest extends TestCase
{
    use WithFaker;

    public function test_de_logout_de_usuario_com_dados_validos()
    {
        $user = User::factory()->create([
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('123456')
        ]);

        $token = $user->createToken('token')->accessToken;

        $response = $this->postJson('/api/auth/logout', [], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);
    }
}
