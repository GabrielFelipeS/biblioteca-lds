<?php

namespace Tests\Feature\Books;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookSearchTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private string $token;
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        Book::factory()->create([
            'title' => 'teste',
        ]);

        $this->user = User::findOrFail(1);
        $this->token = $this->user->createToken('token')->accessToken;
    }

    public function test_search_book(): void
    {
        $response = $this->getJson('/api/books/search', [
            'Authorization' => "Bearer {$this->token}",
            'title' => 'teste',
        ]);

        $response->assertStatus(200);
    }
}
