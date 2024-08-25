FROM node:20 AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine
LABEL authors="Gabriel Felipe"

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/ngnix/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]