<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function __construct(private ReservationService $service) {}
    public function index(Request $request)
    {
        try {
            Log::info('Recebida requisição para listar reservas do usuário: ' . $request->user()->id);
            $reservations = $this->service->listByUser($request->user()->id);
            Log::info('Reservas listadas com sucesso');
            return response()->json($reservations, 200);
        } catch (\Throwable $th) {
            Log::error('Erro ao listar reservas: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Log::info('Recebida requisição para criar reserva do usuário: ' . $request->user()->id);
            return $this->service->create($request->all());
        } catch (\Throwable $th) {
            Log::error('Erro ao criar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function update(Request $request, int $reservation)
    {
        try {
            Log::info('Recebida requisição para atualizar reserva do usuário: ' . $request->user()->id);
            return $this->service->update($reservation, $request->all());
        } catch (\Throwable $th) {
            Log::error('Erro ao atualizar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
