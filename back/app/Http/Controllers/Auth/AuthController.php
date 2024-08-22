<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'email|unique:users|required',
            'password' => 'required|string|min:6'
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ];

        $user = User::create($data);

        return response()->json(['response' => 'Usuario criado com sucesso!'],201);

    }
}
