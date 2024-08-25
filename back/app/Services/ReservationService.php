<?php

namespace App\Services;

use App\Repositories\ReservationRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
                Log::info('Erro na criação da reserva do livro : ' . $data['book_id'] . ', Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Livro já reservado'], 422);
            }
            $book = $this->bookService->getBookById($data['book_id']);
            if (!$book) {
                Log::info('Erro na criação da reserva do livro : ' . $data['book_id'] . ', Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Livro não encontrado'], 404);
            }
            $data = [
                'book_id' => $data['book_id'],
                'user_id' => Auth::user()->id,
                'from' => $data['start_date'],
                'to' => $data['end_date'],
                'status' => 'pending'
            ];

            $reservation = $this->repository->create($data);
            Log::info('Reserva criada com sucesso para o livro: ' . $data['book_id'] . ', Pelo usuário: ' . Auth::user()->id);
            return response()->json($reservation, 201);
        } catch (\Throwable $th) {
            Log::error('Erro ao criar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
