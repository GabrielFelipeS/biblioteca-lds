<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            return response()->json(['message' => 'Usuario registrado com sucesso!'], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao registrar usuario!'], 500);
        }
    }
}
