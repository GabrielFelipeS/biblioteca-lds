<?php

namespace App\Repositories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

abstract class Repository
{
    protected $model;

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }

    public function search(string $query, array $fields): Collection
    {
        $search = $this->model->query();

        foreach ($fields as $field) {
            $search->orWhere(DB::raw("LOWER(CAST({$field} AS TEXT))"), 'LIKE', '%' . strtolower($query) . '%');
        }

        return $search->get();
    }
}
