<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __construct(private UserService $service)
    {
    }
    public function register(UserRegisterRequest $request)
    {
        try {
            $this->service->register($request->validated());
            return response()->json(['message'=> 'Usuário registrado com sucesso!'], 201);
        } catch (\Throwable $th) {
            Log::error('Erro ao registrar usuario: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao registrar usuario!'], 500);
        }
    }

    public function login(UserLoginRequest $request)
    {
        try {
            $token = $this->service->login($request->validated());
            return response()->json(['token' => $token]);
        } catch (\Throwable $th) {
            Log::error('Erro ao realizar login: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao realizar login!'], 500);
        }
    }

    public function logout()
    {
        try {
            Log::info('Tentavia de logout do usuário: ' . auth()->user()->email);
            $this->service->logout();
            Log::info('Logout realizado com sucesso do usuário: ' . auth()->user()->email);
            return response()->json(['message' => 'Logout realizado com sucesso!']);
        } catch (\Throwable $th) {
            Log::error('Erro ao realizar logout: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao realizar logout!'], 500);
        }
    }

    public function validateToken()
    {
        try {
            Log::info('Validando token do usuário: ' . auth()->user()->email);
            return response()->json(['message' => 'Token válido!']);
        } catch (\Throwable $th) {
            Log::error('Erro ao validar token: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao validar token!'], 500);
        }
    }
}
