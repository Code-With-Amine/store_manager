<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'ref';
    protected $fillable = ['CatId','ProdName', 'ProdLogo', 'price', 'Qte', 'WarnQte', 'FactoryDate', 'ExperDate'];
}
