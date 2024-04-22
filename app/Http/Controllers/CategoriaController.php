<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'url_icon' => 'required|url|max:255',
        ]);

        $categoria = new Categoria();
        $categoria->nome = $request->nome;
        $categoria->url_icon = $request->url_icon;
        $categoria->save();

        return redirect()->back()->with('success', 'Categoria criada com sucesso!');
    }
}
