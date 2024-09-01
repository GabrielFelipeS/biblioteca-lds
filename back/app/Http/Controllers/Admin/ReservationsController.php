<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReservationsSearchRequest;
use App\Http\Requests\Admin\ReservationsUpdateStatusRequest;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationsController extends Controller
{
    public function __construct(private ReservationService $service)
    {
        if(Auth::user()->hasRole('bibliotecario') === false) {
            abort(403);
        }
    }

    public function index(ReservationsSearchRequest $request)
    {
        try {
            return $this->service->getAllReservations($request->toArray());
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(ReservationsUpdateStatusRequest $request, $id)
    {
        try {
            return $this->service->updateStatus($id, $request->status);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
