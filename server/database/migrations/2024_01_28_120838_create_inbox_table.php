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
        Schema::create('Inbox', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->foreign('email')
            ->references('email')
            ->on('users')
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('subject');
            $table->string('message');
            $table->date('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inbox');
    }
};
