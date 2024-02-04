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
        Schema::create('Sales', function (Blueprint $table) {
            $table->id('saleId');
            $table->integer('ProdRef')
            ->foreign()
            ->references('ref')
            ->on('Products');
            $table->float('SoldPrice');
            $table->integer('SoldQte');
            $table->date('SoldDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_sale');
    }
};
