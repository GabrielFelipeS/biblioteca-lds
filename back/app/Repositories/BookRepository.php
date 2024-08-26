<?php

namespace App\Repositories;

use App\Models\Book;
use App\Repositories\Repository;

class BookRepository extends Repository
{
    function __construct(Book $book)
    {
        $this->model = $book;
    }
}
