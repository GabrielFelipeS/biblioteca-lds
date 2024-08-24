# Comandos para Rodar o Backend do Projeto

```
cd back/
docker compose up -d;
docker exec -it lds_php bash;
composer install;
php artisan key:generate;
php artisan migrate --seed;
```