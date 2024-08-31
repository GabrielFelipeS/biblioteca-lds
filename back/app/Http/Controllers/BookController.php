<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookRegisterRequest;
use App\Http\Requests\Book\BookSearchRequest;
use App\Http\Requests\Book\BookUpdateRequest;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{

    function __construct(private BookService $service)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        if (auth()->user()->can('listar livro')) {
            try {
                $books = $this->service->getAllBooks();
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::info('Pesquisa de livros: ' . json_encode($parametrosLog));
                return response()->json($books, 200);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::error('Erro ao retornar livros: ' . json_encode($parametrosLog));
                return response()->json('Erro ao retornar livros ' . $th->getMessage(), 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRegisterRequest $request): JsonResponse
    {
        if (auth()->user()->can('adicionar livro')) {
            try {
                $data = $request->validated();
                $data['image'] = $request->file('image');
                $book = $this->service->registerBook($data);
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                    'idLivro' => $book->id,
                ];
                Log::info('Livro Adicionado: ' . json_encode($parametrosLog));
                return response()->json([
                    'message' => 'Livro cadastrado com sucesso',
                    'idLivro' => $book->id], 201);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::error('Erro ao cadastrar livro: ' . json_encode($parametrosLog));
                return response()->json(['message' => 'Erro ao cadastrar livro ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        if (auth()->user()->can('ver livro')) {
            try {
                $book = $this->service->getBookById($id);
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                    'idLivro' => $book->id,
                ];
                Log::info('Pesquisa livro individual: ' . json_encode($parametrosLog));
                return response()->json($book, 200);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::error('Erro ao retornar livro individual: ' . json_encode($parametrosLog));
                return response()->json(['message' => 'Erro ao pesquisar livro ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookUpdateRequest $request, string $id): JsonResponse
    {
        if (auth()->user()->can('editar livro')) {
            try {
                $data = $request->validated();
                if ($request->hasFile('image')) {
                    $data['image'] = $request->file('image');
                }
                $rows = $this->service->updateBook($id, $data);
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                    'idLivro' => $id,
                    'dados' => $data,
                    'colunasAtualizadas' => $rows,
                ];
                Log::info('Livro Atualizado: ' . json_encode($parametrosLog));
                return response()->json([
                    'message' => 'Livro atualizado com sucesso',
                    'idLivro' => $id], 200);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                    'dados' => $request->validated(),
                ];
                Log::error('Erro ao atualizar livro: ' . json_encode($parametrosLog));
                return response()->json(['message' => 'Erro ao atualizar livro ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        if (auth()->user()->can('remover livro')) {
            try {
                $book = $this->service->getBookById($id);
                $this->service->deleteBook($id);
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                    'idLivro' => $id,
                ];
                Log::info('Livro Removido: ' . json_encode($parametrosLog));
                return response()->json(['message' => 'Livro \'' . $book->title . '\' removido com sucesso'], 204);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::error('Erro ao remover livro: ' . json_encode($parametrosLog));
                return response()->json(['message' => 'Erro ao deletar o livro ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }

    public function searchBook(BookSearchRequest $request): JsonResponse
    {
        if (auth()->user()->can('listar livro')) {
            try{
                $params = $request->validated();
                $response = $this->service->searchBook($params);
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::info('Pesquisa de livros: ' . json_encode($parametrosLog));
                return response()->json(data: $response, status: 200);
            } catch (\Throwable $th) {
                $parametrosLog = [
                    'ipUsuario' => request()->ip(),
                    'erro' => $th->getMessage(),
                    'idUsuario' => auth()->user()->getAuthIdentifier(),
                ];
                Log::error('Erro ao retornar livros: ' . json_encode($parametrosLog));
                return response()->json('Erro ao retornar livros ' . $th->getMessage(), 500);
            }
        } else {
            return response()->json(['message' => 'Não autorizado'], 403);
        }
    }
}
