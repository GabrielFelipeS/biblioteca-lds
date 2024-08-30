<?php

namespace Tests\Feature\Reservations;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShowReservationsTest extends TestCase
{
    public function test_listando_reservas_de_usuario_com_sucesso()
    {
        $user = User::factory()->create();
        $user->givePermissionTo('listar reservas');
        $reservations = Reservation::factory(5)->create(['user_id' => $user->id]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $user->createToken('test')->accessToken)
            ->getJson('/api/reservation');

        $response->assertStatus(200);
    }
}
