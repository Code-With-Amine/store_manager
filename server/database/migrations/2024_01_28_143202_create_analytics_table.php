<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnalyticsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('analytics', function (Blueprint $table) {
            $table->integer('ProdRef')
                ->foreign()
                ->references('ref')
                ->on('Products');
            $table->integer('year');
            $table->integer('month');
            $table->float('NbrSales');
            $table->float('TotalSales');
            $table->float('Profits');
            // Create composed primary key
            $table->primary(['ProdRef', 'year', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics');
    }
}
