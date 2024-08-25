<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookResourceTest extends TestCase
{

    use RefreshDatabase, WithFaker;

    private string $token;

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create([
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('123456')
        ]);

        $token = $user->createToken('token')->accessToken;

        Book::factory()->count(5)->create();
    }

    public function test_get_all_books(): void
    {
        $response = $this->getJson('/api/books/', [], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(200);
    }

    public function test_get_book(): void
    {
        $response = $this->getJson('/api/books/1', [], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(200);
    }

    public function test_create_book(): void
    {
        $response = $this->postJson('/api/books/', [
            'title' => $this->faker->name,
            'author' => $this->faker->name,
            'genre' => $this->faker->word,
            'year' => $this->faker->year,
            'isbn' => $this->faker->isbn13(),
            'publisher' => $this->faker->company(),
            'edition' => $this->faker->numberBetween(1,10) . 'ª',
            'image' => $this->faker->imageUrl(),
        ], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(201);
    }

    public function test_update_book(): void
    {
        $response = $this->putJson('/api/books/1', [
            'title' => $this->faker->name,
            'author' => $this->faker->name,
            'genre' => $this->faker->word,
            'year' => $this->faker->year,
            'isbn' => $this->faker->isbn13(),
            'publisher' => $this->faker->company(),
            'edition' => $this->faker->numberBetween(1,10) . 'ª',
            'image' => $this->faker->imageUrl(),
        ], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(200);
    }

    public function test_patch_book()
    {
        $response = $this->patchJson('/api/books/1', [
            'title' => $this->faker->name,
            'author' => $this->faker->name,
        ], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(200);
    }

    public function test_delete_book(): void
    {
        $response = $this->deleteJson('/api/books/2', [], [
            'Authorization' => 'Bearer ' . $this->token
        ]);

        $response->assertStatus(200);
    }


}
