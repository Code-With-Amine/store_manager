<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'CatId' => 'required|exists:Categories,CatId',
            'ProdName' => 'required|string',
            'ProdLogo' => 'required|string',
            'price' => 'required|numeric',
            'Qte' => 'required|integer',
            'WarnQte' => 'required|integer',
            'FactoryDate' => 'required|date',
            'ExperDate' => 'nullable|date',
        ]);

        // Store the data
        $product = new Product();
        $product->CatId = $request->CatId;
        $product->ProdName = $request->ProdName;
        $product->ProdLogo = $request->ProdLogo;
        $product->price = $request->price;
        $product->Qte = $request->Qte;
        $product->WarnQte = $request->WarnQte;
        $product->FactoryDate = $request->FactoryDate;
        $product->ExperDate = $request->ExperDate;
        $product->save();

        return response()->json(['message' => 'Product created successfully'], 201);
    }}
