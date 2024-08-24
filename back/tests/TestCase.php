<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\ClientRepository;

abstract class TestCase extends BaseTestCase
{
    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('migrate:fresh', ['--seed' => true]);
        $cliente = new ClientRepository();
        $this->client = $cliente->createPersonalAccessClient(
            null, 'Test Personal Access Client', 'http://localhost'
        );
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $this->client->id,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d'),
        ]);

        // Configurar client ID e client secret no Passport
        config(['passport.personal_access_client.id' => $this->client->id]);
        config(['passport.personal_access_client.secret' => $this->client->secret]);
    }
}
