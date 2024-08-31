<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReservationController;
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
    Route::apiResource('/books', BookController::class);
    Route::resource('reservation', ReservationController::class);
    Route::put('/reservation/{reservation}/renewal', [ReservationController::class, 'renewal']);
});

