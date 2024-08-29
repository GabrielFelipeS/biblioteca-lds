<?php

namespace Tests\Feature\Reservations;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdateReservationStatusTest extends TestCase
{
    public function test_liberando_reserva_com_sucesso()
    {
        $response = $this->putJson('/api/reservation/1', [
            'status' => 'approved'
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Reserva Liberada com sucesso'
        ]);
    }
}
