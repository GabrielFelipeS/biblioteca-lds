<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * @param string $image
     * @param string $directory
     * @param string $disk
     * @return string Image Path
     *
     */
    public static function saveImage(mixed $image, string $directory, string $disk = 'public' ): string
    {
        $image_path = $image->store($directory, $disk);
        return Storage::url($image_path);
    }
}
