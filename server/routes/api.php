<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// create and login a new user
Route::post('/signUp', [UserController::class, 'store']);

Route::post('/login', [UserController::class, 'login']);



/*Route::middleware(['auth:api'])->prefix('v1')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
*/

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products/{categoryId}/{p}', [ProductController::class, 'index']);

    Route::post('/addCategory', [CategoryController::class, 'store']);
    Route::post('/addProducts', [ProductController::class, 'store']);

    Route::delete('/deleteCat/{id}', [CategoryController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
