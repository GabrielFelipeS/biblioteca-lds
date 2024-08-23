<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends Repository
{
    public function __construct(private User $user)
    {
        $this->model = $user;
    }
}
