<?php

namespace App\Repositories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

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

    public function search(string $query): Collection
    {
        $search = $this->model->query();

        $fillableFields = $this->model->getFillable();

        foreach ($fillableFields as $field) {
            $search->orWhere($field, 'LIKE', "%{$query}%");
        }

        return $search->get();
    }
}
