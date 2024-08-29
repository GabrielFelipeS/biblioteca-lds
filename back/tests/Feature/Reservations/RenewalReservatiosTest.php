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
        ]);

        $data = [
            'from' => Date('Y-m-d', strtotime('-1 day')),
            'to' => Date('Y-m-d', strtotime('+6 day')),
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/1/renewal');

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Reserva renovada com sucesso'
        ]);
    }
}
