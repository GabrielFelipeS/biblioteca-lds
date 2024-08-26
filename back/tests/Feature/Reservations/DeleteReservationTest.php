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
            'status' => 'pending',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/reservation/' . $reservation->id);

        $response->assertStatus(204);
        
        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'status' => 'canceled',
        ]);
    }
    
    public function test_deletando_reserva_inexistente()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/reservation/1000');

        $response->assertStatus(404);
    }
}
