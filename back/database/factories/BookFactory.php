<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'year' => $this->faker->year(),
            'isbn' => $this->faker->isbn13(),
            'genre' => $this->faker->word(),
            'publisher' => $this->faker->company(),
            'edition' => $this->faker->numberBetween(1, 10) . 'º',
            'image' => $this->faker->imageUrl(),
        ];
    }
}
