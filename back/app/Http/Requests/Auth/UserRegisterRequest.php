<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;

class UserRegisterRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
            ],
            'email' => [
                'email:rfc,dns',
                'unique:users',
                'required'
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                RulesPassword::min(6)->mixedCase()->letters()->numbers()->symbols()
            ]
        ];
    }
    
    public function messages() : array
    {
        return([
            'name.required' => 'O campo nome é obrigatório',
            'name.string' => 'O campo nome deve ser uma string',
            'email.email' => 'O campo email deve ser um email válido',
            'email.unique' => 'O email informado já está em uso',
            'email.required' => 'O campo email é obrigatório',
            'password.required' => 'O campo senha é obrigatório',
            'password.string' => 'O campo senha deve ser uma string',
            'password.confirmed' => 'O campo senha deve ser confirmado',
            'password.min' => 'O campo senha deve ter no mínimo 6 caracteres',
            'password.mixed_case' => 'O campo senha deve conter letras maiúsculas e minúsculas',
            'password.letters' => 'O campo senha deve conter letras',
            'password.numbers' => 'O campo senha deve conter números',
            'password.symbols' => 'O campo senha deve conter símbolos'
        ]);
    }
}
