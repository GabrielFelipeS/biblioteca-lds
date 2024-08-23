<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class TokenService
{
    public static function generateToken(Model $model): string
    {
        return $model->createToken('Token de Acesso')->accessToken;
    }
}
