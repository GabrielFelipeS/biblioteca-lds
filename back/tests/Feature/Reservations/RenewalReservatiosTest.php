<?php

namespace Tests\Feature\Reservations;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Date;
use Tests\TestCase;

class RenewalReservatiosTest extends TestCase
{
    public function test_renovacao_de_reserva_com_sucesso()
    {
        $user = User::all()->where('name', 'Biblioteca IFSP')->first();

        $token = $user->createToken('token')->accessToken;

        $reservation = Reservation::factory()->create([
            'to' => Date('Y-m-d', strtotime('-8 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'approved',
        ]);

        $data = [
            'to' => Date('Y-m-d', strtotime('+7 day')),
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/' . $reservation->id . '/renewal', $data);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Reserva renovada com sucesso'
        ]);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'to' => Date('Y-m-d', strtotime('+7 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'approved',
        ]);
    }

    public function test_renovacao_de_reserva_com_status_diferente_de_aprovado()
    {
        $user = User::all()->where('name', 'Biblioteca IFSP')->first();

        $token = $user->createToken('token')->accessToken;

        $reservation = Reservation::factory()->create([
            'to' => Date('Y-m-d', strtotime('-8 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'pending',
        ]);

        $data = [
            'to' => Date('Y-m-d', strtotime('+7 day')),
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/' . $reservation->id . '/renewal', $data);

        $response->assertStatus(422);

        $response->assertJson([
            'message' => 'Reserva pendente'
        ]);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'to' => Date('Y-m-d', strtotime('-8 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'pending',
        ]);
    }

    public function test_renovacao_de_reserva_cancelada()
    {
        $user = User::all()->where('name', 'Biblioteca IFSP')->first();

        $token = $user->createToken('token')->accessToken;

        $reservation = Reservation::factory()->create([
            'to' => Date('Y-m-d', strtotime('-8 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'canceled',
        ]);

        $data = [
            'to' => Date('Y-m-d', strtotime('+7 day')),
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/' . $reservation->id . '/renewal', $data);

        $response->assertStatus(422);

        $response->assertJson([
            'message' => 'Reserva cancelada'
        ]);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'to' => Date('Y-m-d', strtotime('-8 day')),
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'status' => 'canceled',
        ]);
    }
}
