<?php

namespace App\Repositories;

use App\Models\Reservation;

class ReservationRepository extends Repository
{
    public function __construct(Reservation $model)
    {
        parent::__construct($model);
    }

    public function findByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }
}