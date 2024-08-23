<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        try {
            Log::info('Recebida requisição de registro de usuario para o email: ' . $request->email);
            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);
            Log::info('Registrando usuario: ' . $request->email);
            $user = User::create($data);
            Log::info('Usuario registrado com sucesso: ' . $request->email);
            return response()->json(['message' => 'Usuario registrado com sucesso!'], 201);
        } catch (\Throwable $th) {
            Log::error('Erro ao registrar usuario: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao registrar usuario!'], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $user = User::where('email', $request->email)->first();

            if(!$user || !password_verify($request->password, $user->password)){
                return response()->json(['message' => 'Credenciais inválidas!'], 401);
            }
        

            $token = $user->createToken($user->email)->accessToken;

            return response()->json(['token' => $token], 200);

            
        } catch (\Throwable $th) {
            Log::error('Erro ao realizar login: ' . $th->getMessage());
            return response()->json(['message' => 'Erro ao realizar login!'], 500);
        }
    }
}
