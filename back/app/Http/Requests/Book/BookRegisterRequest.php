<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class BookRegisterRequest extends FormRequest
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
            'title' => ['string', 'required'],
            'author' => ['string', 'required'],
            'genre' => ['string', 'required'],
            'year' => ['string', 'required'],
            'isbn' => ['string', 'required'],
            'publisher' => ['string', 'required'],
            'edition' => ['string', 'required'],
            'image' => ['image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O campo título é obrigatório.',
            'title.string' => 'O título deve ser uma string.',

            'author.required' => 'O campo autor é obrigatório.',
            'author.string' => 'O autor deve ser uma string.',

            'genre.required' => 'O campo gênero é obrigatório.',
            'genre.string' => 'O gênero deve ser uma string.',

            'year.required' => 'O campo ano é obrigatório.',
            'year.string' => 'O ano deve ser uma string.',

            'isbn.required' => 'O campo ISBN é obrigatório.',
            'isbn.string' => 'O ISBN deve ser uma string.',

            'publisher.required' => 'O campo editora é obrigatório.',
            'publisher.string' => 'A editora deve ser uma string.',

            'edition.required' => 'O campo edição é obrigatório.',
            'edition.string' => 'A edição deve ser uma string.',

            'image.image' => 'O arquivo deve ser uma imagem.',
            'image.mimes' => 'A imagem deve ser dos tipos: jpeg, jpg, png ou webp.',
            'image.max' => 'A imagem não pode ter mais que 2 MB.',
        ];
    }
}
