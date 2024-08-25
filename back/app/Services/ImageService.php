<?php

namespace App\Services;

class ImageService
{
    /**
     * @param string $image
     * @param string $directory
     * @param string $disk
     * @return string Image Path
     *
     */
    public static function saveImage(mixed $image, string $directory, string $disk = 'storage/app/public' ): string
    {
        $image_path = $image->store($directory, $disk);
        return $image_path;
    }
}
