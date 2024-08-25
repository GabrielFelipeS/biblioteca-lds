<?php

namespace App\Services;

use App\Repositories\ReservationRepository;
use Illuminate\Support\Facades\Auth;

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
    public function create(array $data)
    {
        try {
            $activeReservation = $this->repository->findActiveReservation($data['book_id']);
            if ($activeReservation) {
                throw new \Exception('Já existe uma reserva ativa para este livro');
            }
            $book = $this->bookService->getBookById($data['book_id']);
            if (!$book) {
                throw new \Exception('Livro não encontrado');
            }
            $data = [
                'book_id' => $data['book_id'],
                'user_id' => Auth::user()->id,
                'from' => $data['start_date'],
                'to' => $data['end_date'],
                'status' => 'pending'
            ];

            return $this->repository->create($data);
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage());
        }
    }
}
