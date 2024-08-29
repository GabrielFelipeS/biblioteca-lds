<?php

namespace Tests\Feature\Reservations;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UpdateReservationStatusTest extends TestCase
{
    public function test_liberando_reserva_com_sucesso()
    {
        $user = User::all()->where('name', 'Biblioteca IFSP')->first();

        $token = $user->createToken('token')->accessToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/1', ['status' => 'canceled']);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Status da reserva alterado com sucesso'
        ]);
    }

    public function test_tentativa_de_liberar_reserva_sem_permissao()
    {
        $user = User::factory()->create();
        $role = Role::where('name', 'solicitante')->first();
        $user->assignRole($role);
        $token = $user->createToken('token')->accessToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/reservation/1', ['status' => 'canceled']);

        $response->assertStatus(403);

        $response->assertJson([
            'message' => 'Usuário não tem permissão para atualizar status'
        ]);
    }
}
