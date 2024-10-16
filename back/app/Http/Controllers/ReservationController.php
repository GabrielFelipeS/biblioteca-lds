<?php

namespace App\Http\Controllers;

use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function __construct(private ReservationService $service) {}
    public function index(Request $request)
    {
        try {
            if (Auth::user()->hasPermissionTo('listar reservas')) {
                Log::info('Recebida requisição para listar reservas do usuário: ' . $request->user()->id);
                $reservations = $this->service->listByUser($request->user()->id);
                Log::info('Reservas listadas com sucesso');
                return response()->json($reservations, 200);
            } else {
                Log::info('Usuário sem permissão para listar reservas');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao listar reservas: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function store(StoreReservationRequest $request)
    {
        try {
            if (Auth::user()->hasPermissionTo('criar reserva')) {
                Log::info('Recebida requisição para criar reserva do usuário: ' . $request->user()->id);
                return $this->service->create($request->all());
            } else {
                Log::info('Usuário sem permissão para criar reserva');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao criar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function update(UpdateReservationRequest $request, int $reservation)
    {
        try {
            if (Auth::user()->hasPermissionTo('editar reserva')) {
                Log::info('Recebida requisição para atualizar reserva do usuário: ' . $request->user()->id);
                return $this->service->update($reservation, $request->all());
            } else {
                Log::info('Usuário sem permissão para atualizar reserva');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao atualizar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function destroy(Request $request, int $reservation)
    {
        try {
            if (Auth::user()->hasPermissionTo('cancelar reserva')) {
                Log::info('Recebida requisição para deletar reserva do usuário: ' . $request->user()->id);
                return $this->service->delete($reservation);
            } else {
                Log::info('Usuário sem permissão para deletar reserva');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao deletar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function renewal(Request $request, int $reservation)
    {
        try {
            if (Auth::user()->hasPermissionTo('extender reserva')) {
                Log::info('Recebida requisição para renovar reserva do usuário: ' . $request->user()->id);
                return $this->service->renewal($reservation, $request->all());
            } else {
                Log::info('Usuário sem permissão para renovar reserva');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Throwable $th) {
            Log::error('Erro ao renovar reserva: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
