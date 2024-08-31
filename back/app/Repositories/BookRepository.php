<?php

namespace App\Repositories;

use App\Models\Book;
use App\Repositories\Repository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class BookRepository extends Repository
{
    function __construct(Book $book)
    {
        $this->model = $book;
    }

    public function all(): LengthAwarePaginator | Collection
    {
        return $this->model->paginate(15);
    }
}
