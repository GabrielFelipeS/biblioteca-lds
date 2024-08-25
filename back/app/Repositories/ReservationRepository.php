<?php

namespace App\Repositories;

use App\Models\Reservation;

class ReservationRepository extends Repository
{
    public function __construct(private Reservation $reservation) {
        $this->model = $reservation;
    }

    public function findByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }
    public function findActiveReservation(int $bookId)
    {
        return $this->model->where('book_id', $bookId)->where('status', '!=', 'returned')->first();
    }
    public function findByUserActiveReservations(int $userId)
    {
        return $this->model->where('user_id', $userId)->where('status', '!=', 'returned')->get();
    }
}
