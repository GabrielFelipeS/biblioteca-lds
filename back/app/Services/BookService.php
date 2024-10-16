<?php

namespace App\Services;

use App\Models\Book;
use App\Repositories\BookRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class BookService
{
    function __construct(private BookRepository $repository) {}

    public function getAllBooks(): LengthAwarePaginator | Collection
    {
        return $this->repository->all();
    }

    public function getBookById(int $id): Book | array
    {
        $book = $this->repository->find($id);
        if (!$book) {
            return [];
        } else {
            return $book;
        }
    }

    public function registerBook(array $data)
    {
        $data['image'] = ImageService::saveImage($data['image'], 'books');
        return $this->repository->create($data);
    }

    public function updateBook(int $id, array $data)
    {
        if (isset($data['image'])) {
            $data['image'] = ImageService::saveImage($data['image'], 'books');
        }
        return $this->repository->update($id, $data);
    }

    public function deleteBook(int $id)
    {
        return $this->repository->delete($id);
    }

    public function searchBook(string $query): Collection
    {
        $fields = (new Book())->getFillable();

        unset(
            $fields[array_search('image', $fields, true)],
        );

        return $this->repository->search($query, $fields);
    }
}
