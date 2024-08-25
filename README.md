# Comandos para Rodar o Backend do Projeto

```
docker compose up -d;
docker exec -it lds_php bash;
cp .env-dev .env;
composer install;
php artisan key:generate;
php artisan migrate:fresh --seed;
```
