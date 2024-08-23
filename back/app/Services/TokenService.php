<?php

namespace App\Services;

use App\Models\User;

class TokenService
{
    public function generateToken(User $user): string
    {
        return $user->createToken($user->email)->accessToken;
    }
}
