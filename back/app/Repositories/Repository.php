<?php

namespace App\Repositories;

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

    public function search(array $params): LengthAwarePaginator
    {
        $query = $this->model->query();

        foreach ($params as $key => $value) {
            $query->where($key, 'like', '%' . $value . '%');
        }

        return $query->paginate(15);
    }
}
