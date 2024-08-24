<?php

namespace App\Services;
use App\Models\User;
use Spatie\Permission\Models\Role;

class RolesService
{
    public static function setRole(User $model, $role)
    {
        $role = Role::where('name', $role)->first();
        $model->assignRole($role);
    }
}
