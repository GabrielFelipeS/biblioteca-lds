<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookRegisterRequest;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
        try {
            $books = $this->service->getAllBooks();
            return response()->json($books, 200);
        } catch (\Throwable $th) {
            return response()->json('Erro ao retornar livros ' . $th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRegisterRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['image'] = $request->file('image');
            $this->service->registerBook($data);
            return response()->json(['message' => 'Livro cadastrado com sucesso'], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao cadastrar livro ' . $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $book = $this->service->getBookById($id);
            return response()->json($book, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao pesquisar livro ' . $th->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $book = $this->service->getBookById($id);
            $this->service->deleteBook($id);
            return response()->json(['message' => 'Livro \'' . $book->title . '\' removido com sucesso'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao deletar o livro ' . $th->getMessage()], 500);
        }
    }
}
