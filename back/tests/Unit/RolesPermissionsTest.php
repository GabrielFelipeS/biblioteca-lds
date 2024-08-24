<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;
use Spatie\Permission\Models\Role;

class RolesPermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_role(): void
    {
        $role = Role::create(['name' => 'admin']);
        $this->assertEquals('admin', $role->name);
    }

    public function test_assign_role(): void
    {
        $role = Role::create(['name' => 'admin']);
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password')
        ]);
        $user->assignRole('admin');
        $this->assertTrue($user->hasRole('admin'));
    }

    public function test_create_permission()
    {
        $permission = Permission::create(['name' => 'admin']);
        $this->assertEquals('admin', $permission->name);
    }

    public function test_assing_permission_to_role()
    {
        $permission = Permission::create(['name' => 'edit']);
        $role = Role::create(['name' => 'admin']);

        $role->givePermissionTo('edit');

        $this->assertTrue($role->hasPermissionTo('edit'));
    }

    public function test_assing_role_with_permission_to_user()
    {
        $permission = Permission::create(['name' => 'edit']);
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo('edit');

        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password')
        ]);
        $user->assignRole('admin');

        $this->assertTrue($user->hasRole('admin'));
        $this->assertTrue($user->hasPermissionTo('edit'));
    }

}
