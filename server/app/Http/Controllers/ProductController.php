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
            'price' => 'required|numeric',
            'Qte' => 'required|integer',
            'WarnQte' => 'required|integer',
            'FactoryDate' => 'required|date',
            'ExperDate' => 'nullable|date',
        ]);
        if ($request->has('ProdLogo')) {
            $base64Image = $request->input('ProdLogo');
            $imageData = base64_decode($base64Image);
            $fileName = uniqid() . '.jpg';
            Storage::disk('public')->put('prodLogos/' . $fileName, $imageData);
            $products['ProdLogo'] = $fileName; // Store filename in database
        } else {
            $products['ProdLogo'] = 'prodLogos/noProd';
        }
        // Store the data
        Product::create($products);

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function index($categoryId, $p)
    {
        $productsPerPage = 3; 
        $numberProducts = Product::where('CatId', $categoryId)->get();
        $products = Product::where('CatId', $categoryId)
                    ->skip($productsPerPage * $p)
                    ->limit($productsPerPage)
                    ->get();
        return response()->json(['data' => $products, 'page_number' => $p + 1,
                                  'total_product' => sizeof($numberProducts)
                                ], 200);
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
