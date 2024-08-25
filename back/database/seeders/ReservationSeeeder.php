<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(5)
            ->has(Reservation::factory()
                ->for(Book::factory()))
            ->create();

        Book::factory(5)
            ->has(Reservation::factory()
                ->for(User::factory()))
            ->create();
    }

}
