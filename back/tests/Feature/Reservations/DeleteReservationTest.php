<?php

namespace Tests\Feature\Reservations;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteReservationTest extends TestCase
{
    use RefreshDatabase;
    public function test_deletando_reserva_com_sucesso()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $user->givePermissionTo('cancelar reserva');
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
        $user->givePermissionTo('cancelar reserva');
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/reservation/1000');

        $response->assertStatus(404);
    }

    public function test_tentativa_de_delecao_de_reserva_ja_em_andamento()
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $user->givePermissionTo('cancelar reserva');
        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'status' => 'approved',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/reservation/' . $reservation->id);

        $response->assertStatus(422);
    }
}
