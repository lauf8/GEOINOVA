<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PontoController;



Route::get('/categoria', function () {
    return Inertia::render('CategoriaCreate', [
    ]);
});
Route::post('/', [CategoriaController::class, 'store']);


Route::get('/', [PontoController::class, 'index']);
Route::post('/ponto', [PontoController::class, 'store']);


require __DIR__.'/auth.php';
