# Etapa de build usando Node.js
FROM node:20 AS build

WORKDIR /app

# Copia apenas os arquivos de pacotes (package.json e package-lock.json)
COPY ./package*.json ./

# Instala as dependências
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Gera o build da aplicação
RUN npm run build

# Etapa final com NGINX para servir a aplicação
FROM nginx:stable-alpine
LABEL authors="Gabriel Felipe"

# Copia a configuração customizada do NGINX (certifique-se de que o caminho esteja correto)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build para o diretório padrão de conteúdo do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expondo a porta 80 para servir a aplicação
EXPOSE 80

# Inicia o NGINX em modo foreground
CMD ["nginx", "-g", "daemon off;"]
