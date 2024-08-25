<?php

namespace App\Services;

use App\Repositories\ReservationRepository;

class Reservation
{

    public function __construct(private ReservationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function listByUser($userId)
    {
        return $this->repository->findByUser($userId);
    }
}