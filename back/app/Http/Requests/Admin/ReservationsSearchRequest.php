<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ReservationsSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(Auth::user()->hasRole('bibliotecario') === false) {
            return false;
        }

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
            'from' => ['date'],
            'to' => ['date'],
            'status' => ['string', 'in:pending,completed,canceled,expired,overdue,approved,rejected,returned'],
            'user_id' => ['integer','exists:users,id'],
            'book_id' => ['integer','exists:books,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'from.date' => 'O campo from deve ser uma data',
            'to.date' => 'O campo to deve ser uma data',
            'status.string' => 'O campo status deve ser uma string',
            'status.in' => 'O campo status deve ser um dos valores: pending,completed,canceled,expired,overdue,approved,rejected,returned',
            'user_id.integer' => 'O campo user_id deve ser um inteiro',
            'book_id.integer' => 'O campo book_id deve ser um inteiro',
        ];
    }
}
