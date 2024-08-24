# Usar uma imagem base do PHP-FPM
FROM php:8.2-fpm

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Instalar dependências e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip mbstring bcmath opcache exif pcntl soap intl mysqli \
    && docker-php-ext-enable opcache

# Instalar o Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer


# Ajustar permissões para o diretório de trabalho
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html  && mkdir /var/www/storage && chown -R www-data:www-data /var/www/storage/ && chmod -R 777 /var/www/storage/ && usermod -u 1000 www-data

# Expor a porta 9000
EXPOSE 9000

# Comando para iniciar o PHP-FPM
CMD ["php-fpm"]
