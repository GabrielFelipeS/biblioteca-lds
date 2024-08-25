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
            'from' => '2021-10-10',
            'to' => '2021-10-20',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/reservation', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('reservations', [
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
            'status' => 'pending'
        ]);
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

        $this->assertEquals('Livro já reservado', $response['message']);
    }

    public function test_tentativa_de_nova_reserva_ja_tendo_3_livros_reservados(){
        $user = \App\Models\User::factory()->create();
        $permission =  Permission::findByName('criar reserva');
        $user->givePermissionTo($permission);
        $token = $user->createToken('token')->accessToken;
        $book = \App\Models\Book::factory()->create();
        $book2 = \App\Models\Book::factory()->create();
        $book3 = \App\Models\Book::factory()->create();
        $book4 = \App\Models\Book::factory()->create();

        $reservation = \App\Models\Reservation::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
            'status' => 'pending'
        ]);

        $reservation2 = \App\Models\Reservation::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book2->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
            'status' => 'pending'
        ]);

        $reservation3 = \App\Models\Reservation::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book3->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
            'status' => 'pending'
        ]);

        $data = [
            'book_id' => $book4->id,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/reservation', $data);

        $response->assertStatus(422);

        $this->assertEquals('Usuário já possui 3 reservas ativas', $response['message']);

    }

    public function test_tentativa_de_criacao_de_reserva_com_livro_nao_encontrado(){
        $user = \App\Models\User::factory()->create();
        $permission =  Permission::findByName('criar reserva');
        $user->givePermissionTo($permission);
        $token = $user->createToken('token')->accessToken;

        $data = [
            'book_id' => 10000,
            'from' => '2021-10-10',
            'to' => '2021-10-20',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/reservation', $data);

        $response->assertStatus(404);

        $this->assertEquals('Livro não encontrado', $response['message']);
    }
}
