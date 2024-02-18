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
        Schema::create('Categories', function (Blueprint $table) {
            $table->id('CatId');
            $table->string('email');
            $table->foreign('email')
            ->references('email')
            ->on('users')
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('CatName');
            $table->string('catPhoto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
