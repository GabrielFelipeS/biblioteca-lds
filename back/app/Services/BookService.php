<?php

namespace App\Services;

use App\Models\Book;
use App\Repositories\BookRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class BookService
{
    function __construct(private BookRepository $repository)
    {

    }

    public function getAllBooks(): Collection
    {
        return $this->repository->all();
    }

    public function getBookById(int $id): Book
    {
        return $this->repository->find($id);
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
}
