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
        $response = $this->getJson('/api/books/search?title=teste', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(200);
    }

    public function test_unauthorized_request(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;

        $response = $this->getJson('/api/books/search?title=1', [
            'Authorization' => "Bearer {$token}",
        ]);

        $response->assertStatus(403);
    }

    public function test_wrong_parameter_request(): void
    {
        $response = $this->getJson('/api/books/search?batata=iso', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(400);
    }
}
