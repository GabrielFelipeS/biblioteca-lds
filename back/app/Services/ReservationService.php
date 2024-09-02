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
            $activeUserReservations = $this->repository->findByUserActiveReservations(Auth::user()->id);
            if (count($activeUserReservations) >= 3) {
                Log::info('Erro na criação da reserva do livro : ' . $data['book_id'] . ', Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Usuário já possui 3 reservas ativas'], 422);
            }
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
                'from' => $data['from'],
                'to' => $data['to'],
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

    public function update($reservation, array $data)
    {
        try {
            $reservation = $this->repository->find($reservation);
            if (!$reservation) {
                Log::info('Erro na tentativa de atualizar reserva inexistente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não encontrada'], 404);
            }
            if (isset($data['status'])) {
                if (!Auth::user()->hasRole('bibliotecario')) {
                    Log::info('Erro na tentativa de atualizar reserva sem permissão, Pelo usuário: ' . Auth::user()->id);
                    return response()->json(['message' => 'Usuário não tem permissão para atualizar status'], 403);
                }
                $reservation->status = $data['status'];
                $reservation->save();

                Log::info('Reserva atualizada com sucesso para o livro: ' . $reservation->book_id . ', Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Status da reserva alterado com sucesso'], 200);
            }
            if ($reservation->status !== 'pending') {
                Log::info($reservation->status);
                Log::info('Erro na tentativa de atualizar reserva com status diferente de pendente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não pode ser atualizada'], 422);
            }
            if ($this->repository->update($reservation->id, $data)) {
                Log::info('Reserva atualizada com sucesso para o livro: ' . $reservation->book_id . ', Pelo usuário: ' . Auth::user()->id);
                $reservation = $this->repository->find($reservation->id);
                return response()->json($reservation, 200);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao atualizar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function delete($reservation)
    {
        try {
            $reservation = $this->repository->find($reservation);
            if (!$reservation) {
                Log::info('Erro na tentativa de deletar reserva inexistente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não encontrada'], 404);
            }
            if ($reservation->status !== 'pending') {
                Log::info('Erro na tentativa de deletar reserva com status diferente de pendente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não pode ser deletada'], 422);
            }
            if ($this->repository->update($reservation->id, ['status' => 'canceled'])) {
                Log::info('Reserva deletada com sucesso para o livro: ' . $reservation->book_id . ', Pelo usuário: ' . Auth::user()->id);
                return response()->json([], 204);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao deletar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function renewal(int $reservation, array $data)
    {
        try {
            $reservation = $this->repository->find($reservation);
            if (!$reservation) {
                Log::info('Erro na tentativa de renovar reserva inexistente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não encontrada'], 404);
            }
            if ($reservation->status !== 'approved') {
                if ($reservation->status === 'canceled') {
                    Log::info('Erro na tentativa de renovar reserva cancelada, Pelo usuário: ' . Auth::user()->id);
                    return response()->json(['message' => 'Reserva cancelada'], 422);
                }
                if ($reservation->status === 'pending') {
                    Log::info('Erro na tentativa de renovar reserva pendente, Pelo usuário: ' . Auth::user()->id);
                    return response()->json(['message' => 'Reserva pendente'], 422);
                }
                if ($reservation->status === 'denied') {
                    Log::info('Erro na tentativa de renovar reserva negada, Pelo usuário: ' . Auth::user()->id);
                    return response()->json(['message' => 'Reserva negada'], 422);
                }
                if ($reservation->status === 'overdue') {
                    Log::info('Erro na tentativa de renovar reserva atrasada, Pelo usuário: ' . Auth::user()->id);
                    return response()->json(['message' => 'Reserva atrasada'], 422);
                }
                Log::info('Erro na tentativa de renovar reserva com status diferente de aprovado, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não pode ser renovada'], 422);
            }
            $maxDate = Date('Y-m-d', strtotime('+7 day'));
            if (\Carbon\Carbon::parse($data['to'])->greaterThan($maxDate)) {
                Log::info('Erro na tentativa de renovar reserva com data de retorno maior que 7 dias, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'A data de retorno não pode ser maior que 7 dias após a data de retirada.'], 422);
            }
            $data = [
                'to' => $data['to'],
            ];
            if ($this->repository->update($reservation->id, $data)) {
                Log::info('Reserva renovada com sucesso para o livro: ' . $reservation->book_id . ', Pelo usuário: ' . Auth::user()->id);
                $reservation = $this->repository->find($reservation->id);
                return response()->json(['message' => 'Reserva renovada com sucesso'], 200);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao renovar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }


    public function getAllReservations($request)
    {
        try {
            Log::info('Buscando reservas pelo usuário: ' . Auth::user()->id . ' com os filtros: ' . json_encode($request));
            $reservations = $this->repository->getAllReservations($request);
            Log::info('Reservas encontradas pelo usuário: ' . Auth::user()->id . ', reservas: ' . $reservations);
            return response()->json($reservations, 200);
        } catch (\Throwable $th) {
            Log::error('Erro ao buscar reservas: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao buscar reservas'], 500);
        }
    }

    public function updateStatus($id, $status)
    {
        try {
            Log::info('Atualizando status da reserva: ' . $id . ' para: ' . $status . ', Pelo usuário: ' . Auth::user()->id);
            $reservation = $this->repository->find($id);
            if (!$reservation) {
                Log::info('Erro na tentativa de atualizar status de reserva inexistente, Pelo usuário: ' . Auth::user()->id);
                return response()->json(['message' => 'Reserva não encontrada'], 404);
            }
            $reservation->status = $status;
            $reservation->save();
            Log::info('Status da reserva atualizado com sucesso para o livro: ' . $reservation->book_id . ', Pelo usuário: ' . Auth::user()->id);
            return response()->json(['message' => 'Status da reserva alterado com sucesso'], 200);
        } catch (\Throwable $th) {
            Log::error('Erro ao atualizar status da reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
