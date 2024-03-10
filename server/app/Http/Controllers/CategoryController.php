<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Storage;

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

    public function update(Request $request, $id)
    {
    $category = Category::findOrFail($id);

    $filedData = $request->validate([
        'CatName' => 'required',
    ]);

    $category->update($filedData);

    if ($request->hasFile('catPhoto')) {
        // Delete the old image file if exists
        if (!empty($category->catPhoto)) {
            Storage::disk('public')->delete($category->catPhoto);
        }
        // Store the new image file
        $category->catPhoto = $request->file('catPhoto')->store('catLogos', 'public');
        $category->save();
    }

    return response()->json([
        'message' => 'Category updated successfully',
    ]);
}

    public function destroy($id)
    {
    $category = Category::findOrFail($id);

    // Delete the image from the folder if it exists
    if (!empty($category->catPhoto)) {
        Storage::disk('public')->delete($category->catPhoto);
    }

    $category->delete();

    return response()->json([
        'message' => 'Category deleted successfully',
    ]);
    }

}
