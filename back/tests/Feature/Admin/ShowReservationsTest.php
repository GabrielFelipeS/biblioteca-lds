<?php

namespace Tests\Feature\Admin;

use App\Models\Reservation;
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

    public function test_buscando_reservas_com_status_pendente()
    {
        $user = User::find(1);
        $token = $user->createToken('token')->accessToken;

        $allReservations = Reservation::where('status', 'pending')->count();

        $reservations = Reservation::factory()->count(5)->create([
            'status' => 'pending'
        ]);

        $response = $this->withHeaders([
            "Authorization" => "Bearer $token",
        ])->getJson('/api/admin/reservations?status=pending');

        $response->assertStatus(200);

        $size = $allReservations+5;

        $response->assertJsonCount($size);
    }
}
