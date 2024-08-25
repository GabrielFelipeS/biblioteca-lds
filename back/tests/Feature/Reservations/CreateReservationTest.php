<?php

namespace Tests\Feature\Reservations;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class CreateReservationTest extends TestCase
{
    public function test_de_criacao_de_reserva_com_dados_validos()
    {
        $user = \App\Models\User::factory()->create();
        $permission =  Permission::findByName('criar reserva');
        $user->givePermissionTo($permission);
        $token = $user->createToken('token')->accessToken;
        $book = \App\Models\Book::factory()->create();

        $data = [
            'book_id' => $book->id,
            'start_date' => '2021-10-10',
            'end_date' => '2021-10-20',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/reservation', $data);

        $response->assertStatus(201);
    }

    public function test_teste_de_criacao_com_livro_ja_reservado()
    {
        $user = \App\Models\User::factory()->create();
        $permission =  Permission::findByName('criar reserva');
        $user->givePermissionTo($permission);
        $token = $user->createToken('token')->accessToken;
        $book = \App\Models\Book::factory()->create();
        $reservation = \App\Models\Reservation::factory()->create([
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
        ]);

        $data = [
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/reservation', $data);

        $response->assertStatus(422);
    }
}
