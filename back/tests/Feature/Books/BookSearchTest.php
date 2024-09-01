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
    private Book $book;

    public function setUp(): void
    {
        parent::setUp();

        $this->book = Book::factory()->create([
            'title' => 'teste',
            'author' => 'autor 123',
            'publisher' => 'joão'
        ]);

        $this->user = User::findOrFail(1);
        $this->token = $this->user->createToken('token')->accessToken;
    }

    public function test_search_book(): void
    {
        $response = $this->getJson('/api/books/search/teste', [
            'Authorization' => "Bearer {$this->token}",
        ]);


        $this->assertEquals($this->book->id, $response->json()[0]['id']);
        $response->assertStatus(200);
    }

    public function test_unauthorized_request(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('token')->accessToken;

        $response = $this->getJson('/api/books/search/1', [
            'Authorization' => "Bearer {$token}",
        ]);

        $response->assertStatus(403);
    }

    public function test_sql_injection(): void
    {
        $response = $this->getJson('/api/books/search/%27); TRUNCATE TABLE books; --', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        // Check if the response status is 400 Bad Request or 422 Unprocessable Entity
        // depending on how your API handles invalid input
        $response->assertStatus(400); // or 422

        // Retrieve all books from the database
        $books = Book::all();

        // Assert that the books table is not empty and hasn't been affected
        $this->assertNotEmpty($books, "Books table was unexpectedly emptied due to SQL injection!");
    }

    public function test_search_with_special_characters(): void
    {
        $response = $this->getJson('/api/books/search/joão', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(200);
        $this->assertEquals($this->book->id, $response->json()[0]['id']);
    }


    public function test_search_with_spaces(): void
    {
        $response = $this->getJson('/api/books/search/autor 123', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->assertStatus(200);
        $this->assertEquals($this->book->id, $response->json()[0]['id']);
    }


}
