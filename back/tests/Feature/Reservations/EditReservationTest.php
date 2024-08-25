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
    }
}
