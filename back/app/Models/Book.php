<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'year',
        'isbn',
        'genre',
        'publisher',
        'edition',
        'image',
    ];

    public function reservation(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
