<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->references('id')->on('books');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->date('from');
            $table->date('to');
            $table->enum('status', ['pending', 'approved', 'rejected', 'returned', 'canceled', 'expired', 'overdue']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
