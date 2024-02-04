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
        Schema::create('Products', function (Blueprint $table) {
            $table->increments('ref');
            $table->unsignedBigInteger('CatId');
            $table->foreign('CatId')
                ->references('CatId')
                ->on('Categories')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('ProdName');
            $table->string('ProdLogo');
            $table->double('price', 8, 2);
            $table->integer('Qte');
            $table->integer('WarnQte');
            $table->date('FactoryDate');
            $table->date('ExperDate')->nullable();
            $table->timestamps();
        });        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
