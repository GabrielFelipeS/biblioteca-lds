<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserTokenValidateTest extends TestCase
{
    public function test_validando_token_de_admin(){
        $user = User::factory()->create();
        $role = Role::findOrCreate('bibliotecario', 'api');
        $user->assignRole($role);

        $token = $user->createToken('token')->accessToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/auth/validate');

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Token válido!',
            'type' => 'bibliotecario'
        ]);
    }
}
