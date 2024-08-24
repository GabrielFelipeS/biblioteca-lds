FROM nginx:latest

WORKDIR /var/www/html/

RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 777 /var/www/html/

COPY conf.d /etc/nginx/conf.d/default.conf
