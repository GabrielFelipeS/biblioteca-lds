<?php

namespace App\Http\Controllers;

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
        $books = $this->service->getAllBooks();
        return response()->json($books, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $book = $this->service->getBookById($id);
        return response()->json($book, 200);
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
        $book = $this->service->getBookById($id);
        $this->service->deleteBook($id);
        return response()->json(['message' => 'Livro \'' . $book->title . '\' removido com sucesso'], 200);
    }
}
