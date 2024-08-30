<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            $this->except(['book_id', 'user_id'])
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from' => ['date', 'after:today'],
            'to' => ['date', 'after:from', function ($attribute, $value, $fail) {
                $from = $this->input('from');
                $to = $value;
                $maxDate = \Carbon\Carbon::parse($from)->addDays(7);
                if (\Carbon\Carbon::parse($to)->greaterThan($maxDate)) {
                    $fail('A data de retorno não pode ser maior que 7 dias após a data de retirada.');
                }
            }],
            'status' => ['in:pending,approved,canceled']
        ];
    }

    public function messages()
    {
        return [
            'from.required' => 'A data de retirada é obrigatória.',
            'from.date' => 'A data de retirada deve ser uma data válida.',
            'from.after' => 'A data de retirada deve ser uma data futura.',
            'to.required' => 'A data de retorno é obrigatória.',
            'to.date' => 'A data de retorno deve ser uma data válida.',
            'to.after' => 'A data de retorno deve ser uma data futura.',
            'status.in' => 'O status da reserva é inválido.'
        ];
    }
    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $blockedParams = ['book_id', 'user_id'];
            foreach ($blockedParams as $param) {
                if ($this->has($param)) {
                    $validator->errors()->add($param, "O parâmetro $param não é permitido.");
                }
            }
        });
    }
}
