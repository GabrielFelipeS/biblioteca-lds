<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationsController extends Controller
{
    public function __construct(private ReservationService $service)
    {
        if(Auth::user()->hasRole('admin') === false) {
            abort(403);
        }
    }

    public function index(Request $request)
    {
        try {
            return $this->service->getAllReservations($request->all());
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
