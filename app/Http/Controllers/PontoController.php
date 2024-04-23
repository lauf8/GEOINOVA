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
        $pontos = Ponto::with('categoria')->get();
        

        return Inertia::render('Welcome',[
            'categorias' => $categorias,
            'pontos' => $pontos,
        ]);
    }

    public function store(Request $request)
    {   
        $request->validate([
            'nome' => 'required|string|max:255',
            'categoria_id' => 'required|max:255',
            'endereco' => 'required|max:255',
            'lng' => 'required|max:255',
            'lat' => 'required|max:255',
        ]);
        
        $ponto = new Ponto();
        $ponto->nome = $request->nome;
        $ponto->endereco = $request->endereco;
        $ponto->categoria_id = $request->categoria_id;
        $ponto->lng = $request->lng;
        $ponto->lat = $request->lat;
        $ponto->save();

        return redirect()->back()->with('success', 'Pronto Criado com sucesso!');
    }
}
