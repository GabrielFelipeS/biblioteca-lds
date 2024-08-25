<?php

namespace Tests\Feature\Reservations;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditReservationTest extends TestCase
{
    public function test_editando_reserva_com_sucesso()
    {
        $book = Book::factory()->create();

        $newData = [
            'book_id' => $book->id,
            'start_date' => '2021-10-10',
            'end_date' => '2021-10-15',
        ];

        $response = $this->putJson('/api/reservation/1', $newData);

        $response->assertStatus(200);
    }
}
