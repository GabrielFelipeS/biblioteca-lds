<?php

namespace Database\Seeders;

use App\Models\User;
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
        
        // Management Permissions
        Permission::create(['name' => 'listar livro']);
        Permission::create(['name' => 'adicionar livro']);
        Permission::create(['name' => 'editar livro']);
        Permission::create(['name' => 'remover livro']);
        Permission::create(['name' => 'devolver livro']);
        Permission::create(['name' => 'ver livro']);

        Permission::create(['name' => 'remover usuario']);
        Permission::create(['name' => 'editar usuario']);
        Permission::create(['name' => 'listar usuario']);
        Permission::create(['name' => 'ver usuario']);
        Permission::create(['name' => 'adicionar usuario']);
        
        // Reservations Permissions
        
        Permission::create(['name' => 'ver reserva']);
        Permission::create(['name' => 'criar reserva']);
        Permission::create(['name' => 'cancelar reserva']);
        Permission::create(['name' => 'listar reservas']);
        Permission::create(['name' => 'extender reserva']);
        Permission::create(['name' => 'editar reserva']);
        


        $solicitante = Role::create(['name' => 'solicitante'])->givePermissionTo([
            'criar reserva',
            'cancelar reserva',
            'devolver livro',
            'extender reserva',
            'listar livro',
            'ver reserva',
            'ver livro',
            'listar reservas',
            'editar reserva'
        ]);

        $superAdmin = Role::create(['name' => 'bibliotecario'])
            ->givePermissionTo(Permission::all());

    }
}
