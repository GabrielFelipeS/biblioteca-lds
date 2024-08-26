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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from' => ['required', 'date', 'after:today'],
            'to' => ['required', 'date', 'after:from', function ($attribute, $value, $fail) {
                $from = $this->input('from');
                $to = $value;
                $maxDate = \Carbon\Carbon::parse($from)->addDays(7);
                if (\Carbon\Carbon::parse($to)->greaterThan($maxDate)) {
                    $fail('A data de retorno não pode ser maior que 7 dias após a data de retirada.');
                }
            }],
        ];
    }
}
