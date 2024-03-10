<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        // Validation
       $products = $request->validate([
            'CatId' => 'required|exists:categories,CatId',
            'ProdName' => 'required|string',
            'ProdLogo' => 'required|string',
            'price' => 'required|numeric',
            'Qte' => 'required|integer',
            'WarnQte' => 'required|integer',
            'FactoryDate' => 'required|date',
            'ExperDate' => 'nullable|date',
        ]);
        if($request->hasFile('ProdLogo')){
            $product['ProdLogo'] = $request->file('ProdLogo')->store('prodLogos', 'public');
        }
        // Store the data
        Product::create($products);

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function index($categoryId)
    {
        $products = Product::where('CatId', $categoryId)->get();

        return response()->json(['data' => $products], 200);
    }

    public function find($productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['data' => $product], 200);
    }

    public function update(Request $request, $productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validation
        $request->validate([
            'CatId' => 'exists:categories,id',
            'ProdName' => 'string',
            'ProdLogo' => 'string',
            'price' => 'numeric',
            'Qte' => 'integer',
            'WarnQte' => 'integer',
            'FactoryDate' => 'date',
            'ExperDate' => 'nullable|date',
        ]);

        // Update the data
        $product->fill($request->all());
        $product->save();

        return response()->json(['message' => 'Product updated successfully'], 200);
    }

    public function destroy($productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        if (!empty($product->ProdLogo)) {
            Storage::disk('public')->delete($product->ProdLogo);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
