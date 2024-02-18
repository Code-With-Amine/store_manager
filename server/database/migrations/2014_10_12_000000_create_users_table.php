<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('userName')->unique();
            $table->string('email')->unique();
            $table->string('companyName');
            $table->string('f_name');
            $table->string('l_name');
            $table->string('companyLogo')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->primary('userName');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
