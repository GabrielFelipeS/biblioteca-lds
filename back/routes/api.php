<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Admin\ReservationsController as AdminReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/validate', [AuthController::class, 'validateToken']);
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/books/search/{query}', [BookController::class, 'searchBook']);
    Route::apiResource('/books', BookController::class)->withoutMiddleware(['auth:api']);
    Route::resource('reservation', ReservationController::class);
    Route::put('/reservation/{reservation}/renewal', [ReservationController::class, 'renewal']);

    Route::group(['prefix' => 'admin'], function () {
        Route::get('/reservations', [AdminReservationController::class, 'index']);
    });
});

