<?php

namespace App\Services;

use App\Repositories\ReservationRepository;

class ReservationService
{

    public function __construct(private ReservationRepository $repository, private BookService $bookService)
    {
        $this->repository = $repository;
    }

    public function listByUser($userId)
    {
        return $this->repository->findByUser($userId);
    }
}
