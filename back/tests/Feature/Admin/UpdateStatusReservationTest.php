<?php

namespace Tests\Feature\Admin;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdateStatusReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_liberando_reserva_de_livro_com_sucesso()
    {
        $user = User::find(1);

        $token = $user->createToken('token')->accessToken;

        $reservation = Reservation::factory()->create([
            'status' => 'pending'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->putJson('/api/admin/reservations/' . $reservation->id . '/status', [
            'status' => 'approved'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'status' => 'approved'
        ]);
    }
}
