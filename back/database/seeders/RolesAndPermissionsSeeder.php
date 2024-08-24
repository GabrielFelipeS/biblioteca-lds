<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Base User Permissions
        Permission::create(['name' => 'criar reserva']);
        Permission::create(['name' => 'cancelar reserva']);
        Permission::create(['name' => 'devolver livro']);
        Permission::create(['name' => 'extender reserva']);
        Permission::create(['name' => 'listar livro']);
        Permission::create(['name' => 'ver reserva']);

        // Management Permissions
        Permission::create(['name' => 'adicionar livro']);
        Permission::create(['name' => 'editar livro']);
        Permission::create(['name' => 'remover livro']);
        Permission::create(['name' => 'remover usuario']);

        $solicitante = Role::create(['name' => 'solicitante'])->givePermissionTo([
            'criar reserva',
            'cancelar reserva',
            'devolver livro',
            'extender reserva',
            'listar livro',
            'ver reserva',
        ]);

        $superAdmin = Role::create(['name' => 'Super-Admin'])
            ->givePermissionTo(Permission::all());

    }
}
