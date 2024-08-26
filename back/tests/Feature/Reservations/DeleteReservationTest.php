<?php

namespace Tests\Feature\Reservations;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteReservationTest extends TestCase
{
    public function test_deletando_reserva_com_sucesso()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/reservation/' . $reservation->id);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('reservations', [
            'id' => $reservation->id,
        ]);
    }   
}
