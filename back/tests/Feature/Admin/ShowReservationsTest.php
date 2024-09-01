<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShowReservationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_checando_todas_reservas_do_sistema()
    {
        $user = User::find(1);
        $token = $user->createToken('token')->accessToken;

        $response = $this->withHeaders([
            "Authorization" => "Bearer $token",
        ])->getJson('/api/admin/reservations');

        $response->assertStatus(200);
    }
}
