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
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-15',
        ];

        $reservation = Reservation::factory()->create([
            'book_id' => $book->id,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);


        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/reservation/' . $reservation->id, $newData);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $reservation->id,
            'book_id' => $book->id,
            'user_id' => $user->id,
            'from' => '2021-10-10',
            'to' => '2021-10-15',
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'book_id' => $book->id,
            'user_id' => $user->id,
            'from' => '2021-10-10',
            'to' => '2021-10-15',
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
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-15',
        ];

        $reservation = Reservation::factory()->create([
            'book_id' => $book->id,
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
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-15',
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
