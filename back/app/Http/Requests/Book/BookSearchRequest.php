<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class BookSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['string', 'sometimes'],
            'author' => ['string', 'sometimes'],
            'genre' => ['string', 'sometimes'],
            'year' => ['string', 'sometimes'],
            'isbn' => ['string', 'sometimes'],
            'publisher' => ['string', 'sometimes'],
            'edition' => ['string', 'sometimes'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $allowedFields = array_keys($this->rules());

        $extraFields = array_diff(array_keys($this->all()), $allowedFields);

        if (!empty($extraFields)) {
            throw ValidationException::withMessages([
                'error' => 'Campos inválidos fornecidos: ' . implode(', ', $extraFields),
            ])->status(400);
        }
    }

    public function messages(): array
    {
        return [
            'title.string' => 'O título deve ser uma string.',
            'author.string' => 'O autor deve ser uma string.',
            'genre.string' => 'O gênero deve ser uma string.',
            'year.string' => 'O ano deve ser uma string.',
            'isbn.string' => 'O ISBN deve ser uma string.',
            'publisher.string' => 'A editora deve ser uma string.',
            'edition.string' => 'A edição deve ser uma string.',
        ];
    }
}
