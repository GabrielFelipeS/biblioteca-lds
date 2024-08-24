<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\ClientRepository;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Artisan::call('passport:keys' , ['--force' => true]);

        chmod(storage_path('oauth-public.key'), 0777);
        chmod(storage_path('oauth-private.key'), 0777);
        $cliente = new ClientRepository();
        $client = $cliente->createPersonalAccessClient(
            null, 'Test Personal Access Client', 'http://localhost'
        );
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $client->id,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
        ]);

        config(['passport.personal_access_client.id' => $client->id]);
        config(['passport.personal_access_client.secret' => $client->secret]);

        $this->call([
            UserSeeder::class,
            BookSeeder::class,
            ReservationSeeeder::class,
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
