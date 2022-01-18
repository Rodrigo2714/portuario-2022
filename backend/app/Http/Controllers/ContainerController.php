<?php

namespace App\Http\Controllers;

use App\Models\Container;
use Illuminate\Http\Request;

class ContainerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['containers' => Container::all()]);
    }

    public function store(Request $request)
    {
        if (
            !$request->client ||
            !$request->number ||
            !$request->type ||
            !$request->status ||
            !$request->category
        ) {
            return response()->json(['message' => 'Nem todos os campos foram preenchidos!'], '404');
        }

        try {
            Container::create($request->all());
            return response()->json(['message' => 'Cadastrado com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Ocorreu um erro!']);
        }
    }

    public function edit($id)
    {
        return response()->json(['container' => Container::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        if (
            !$request->client ||
            !$request->number ||
            !$request->type ||
            !$request->status ||
            !$request->category
        ) {
            return response()->json(['message' => 'Nem todos os campos foram preenchidos!'], '404');
        }

        try {
            Container::findOrFail($id)->update($request->all());
            return response()->json(['message' => 'Atualizado com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Ocorreu um erro!']);
        }
    }

    public function destroy($id)
    {
        try {
            Container::findOrFail($id)->delete();
            return response()->json(['message' => 'Deletado com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Ocorreu um erro!']);
        }
    }
}
