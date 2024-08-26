<?php

namespace Tests\Feature\Reservations;

use App\Models\Book;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class EditReservationTest extends TestCase
{
    public function test_editando_reserva_com_sucesso()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $permission = Permission::findByName('editar reserva');
        $user->givePermissionTo($permission);

        $newData = [
            'from' => Date('Y-m-d', strtotime('+1 day')),
            'to' =>  Date('Y-m-d', strtotime('+7 day')),
        ];

        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'status' => 'pending',
        ]);


        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/reservation/' . $reservation->id, $newData);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $reservation->id,
            'user_id' => $user->id,
            'from' => Date('Y-m-d', strtotime('+1 day')),
            'to' =>  Date('Y-m-d', strtotime('+7 day')),
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'user_id' => $user->id,
            'from' => Date('Y-m-d', strtotime('+1 day')),
            'to' =>  Date('Y-m-d', strtotime('+7 day')),
            'status' => 'pending',
        ]);
    }

    public function test_editanto_reserva_com_status_nao_pendente()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $permission = Permission::findByName('editar reserva');
        $user->givePermissionTo($permission);

        $newData = [
            'from' => Date('Y-m-d', strtotime('+1 day')),
            'to' =>  Date('Y-m-d', strtotime('+7 day')),
        ];

        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'status' => 'approved',
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/reservation/' . $reservation->id, $newData);

        $response->assertStatus(422);

        $response->assertJsonFragment([
            'message' => 'Reserva não pode ser atualizada',
        ]);
    }

    public function test_editando_reserva_que_nao_existe()
    {
        $book = Book::factory()->create();
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;
        $permission = Permission::findByName('editar reserva');
        $user->givePermissionTo($permission);

        $newData = [
            'from' => Date('Y-m-d', strtotime('+1 day')),
            'to' =>  Date('Y-m-d', strtotime('+7 day')),
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/reservation/1000', $newData);

        $response->assertStatus(404);

        $response->assertJsonFragment([
            'message' => 'Reserva não encontrada',
        ]);
    }
}
