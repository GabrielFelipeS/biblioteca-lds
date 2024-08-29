<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Dar todas as permissões existentes para a Role `bibliotecario`
        Gate::before(function ($user, $ability) {
            return $user->hasRole('bibliotecario') ? true : null;
        });
    }
}
