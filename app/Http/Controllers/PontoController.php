<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Ponto;
use App\Models\Categoria;

use Illuminate\Http\Request;

class PontoController extends Controller
{
    public function index()
    {
        $categorias = Categoria::all();

        return Inertia::render('Welcome',[
            'categorias' => $categorias,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'categoria_id' => 'required|max:255',
            'endereco' => 'required|max:255',
        ]);

        $ponto = new Ponto();
        $ponto->nome = $request->nome;
        $ponto->endereco = $request->endereco;
        $ponto->categoria_id = $request->categoria_id;
        $ponto->save();

        return redirect()->back()->with('success', 'Categoria criada com sucesso!');
    }
}
