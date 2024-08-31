<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class BookUpdateRequest extends FormRequest
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
            'image' => ['image', 'mimes:jpeg,jpg,png,webp', 'max:2048', 'sometimes'],
        ];
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
            'image.image' => 'O arquivo deve ser uma imagem.',
            'image.mimes' => 'A imagem deve ser dos tipos: jpeg, jpg, png ou webp.',
            'image.max' => 'A imagem não pode ter mais que 2 MB.',
        ];
    }
}
