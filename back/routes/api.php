<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    $user = \App\Models\User::create([
       'name' => 'Teste',
       'email' => 'teste1@teste.com',
       'password' => bcrypt('123456')
    ]);

    $token = $user->createToken('token')->accessToken;

    return response()->json(['token' => $token], 200);

});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
