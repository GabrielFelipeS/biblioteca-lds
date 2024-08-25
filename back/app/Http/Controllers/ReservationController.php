<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('Recebida requisição para listar reservas do usuário: ' . $request->user()->id);
            $reservations = Reservation::where('user_id', $request->user()->id)->get();
            Log::info('Reservas listadas com sucesso');
            return response()->json($reservations, 200);
        } catch (\Throwable $th) {
            Log::error('Erro ao listar reservas: ' . $th->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
