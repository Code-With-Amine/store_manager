<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $userEmail = auth()->user()->email;
        $filedData = $request->validate([
            'CatName' => 'required',
        ]);

        $filedData['email'] = $userEmail;
        if ($request->hasFile('catPhoto')) {
            $filedData['catPhoto'] = $request->file('catPhoto')->store('catLogos', 'public');
        }
        Category::create($filedData);
        return response()->json([
            'message' => 'Added successfully'
        ]);
    }

    public function update()
    {
    }

    public function index()
    {
        $userEmail = auth()->user()->email;
        $categories = Category::query()->where('email', $userEmail)->get();
        if (sizeof($categories) == 0) {
            return response()->json([
                'message' => 'There are no categories yet'
            ], 401);
        }
        return response()->json([
            "data" => $categories
        ], 200);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully!',
        ]);
    }
}
