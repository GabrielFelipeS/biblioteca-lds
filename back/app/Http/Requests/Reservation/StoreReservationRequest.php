<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'book_id' => ['required', 'exists:books,id'],
            'from' => ['required', 'date','after:today'],
            'to' => ['required', 'date', 'after:from'],
        ];
    }

    public function messages(): array
    {
        return [
            'book_id.required' => 'O campo book_id é obrigatório',
            'book_id.exists' => 'O livro informado não existe',
            'from.required' => 'O campo from é obrigatório',
            'from.date' => 'O campo from deve ser uma data',
            'to.required' => 'O campo to é obrigatório',
            'to.date' => 'O campo to deve ser uma data',
            'to.after' => 'O campo to deve ser uma data posterior a retirada',
            'from.after' => 'O campo de retirada deve ser uma data posterior a hoje',
        ];
    }
}
