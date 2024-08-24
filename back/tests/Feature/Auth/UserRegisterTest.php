<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserRegisterTest extends TestCase
{

    use WithFaker;

    public function test_de_registro_com_dados_validos(){
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => '@Teste1234',
            'password_confirmation' => '@Teste1234'
        ];

        $response = $this->postJson('/api/auth/register', $data);

        $response->assertStatus(201);
    }
}
