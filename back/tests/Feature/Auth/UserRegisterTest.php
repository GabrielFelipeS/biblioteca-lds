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
            'password' => '123456',
            'password_confirmation' => '123456'
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(201);
    }
}
