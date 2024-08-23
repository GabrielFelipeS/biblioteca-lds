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

        Permission::create(['name' => 'alugar livro']);
        Permission::create(['name' => 'devolver livro']);
        Permission::create(['name' => 'renovar aluguel']);

        $solicitante = Role::create(['name' => 'solicitante'])->givePermissionTo([
            'alugar livro',
            'devolver livro',
            'renovar aluguel',
        ]);

        $superAdmin = Role::create(['name' => 'Super-Admin'])
            ->givePermissionTo(Permission::all());

    }
}
