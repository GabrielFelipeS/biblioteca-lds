# Documentação da API

## Usuário Administrador Padrão:

### Usuário que possui todas as permissões por padrão:

- `name` : admin
- `email` : admin@admin.com
- `password` : password

# Rotas de API:

## Rota: `api/auth/register`

### Método: POST

### Campos Necessários

- `name` (string): Nome do usuário.
- `email` (string, email): Endereço de e-mail do usuário.
- `password` (string): Senha do usuário. Deve ter no mínimo 6 dígitos e ser misturada (ou seja, incluir letras e números).
- `password_confirmation` (string): Confirmação da senha. Deve corresponder à senha fornecida e seguir os mesmos requisitos.

### Respostas

#### Sucesso

- **Código HTTP:** 201 Created

- **Retorno:**
    ```json
    {
        "message": "Usuário registrado com sucesso!"
    }
    ```

#### Dados Inválidos

- **Código HTTP:** 422 Unprocessable Content

- **Retorno:**
    ```json
    {
        "message": "O campo nome é obrigatório (and 2 more errors)",
        "errors": {
            "name": [
                // Mensagens de erro específicas para o campo "name"
            ],
            "email": [
                // Mensagens de erro específicas para o campo "email"
            ],
            "password": [
                // Mensagens de erro específicas para o campo "password"
            ]
        }
    }
    ```

## Rota api/auth/login

### Método: POST

### Campos Necessarios

- `email` (string): Email do usuario para login
- `password` (string): Senha para o login (Senha Mixada: ex: @Test1234)


### Respostas

- **Código HTTP:** 200 Ok


- **Retorno:**
    ```json
    {
        "token": "valor do token",
    }

#### Dados Inválidos

- **Código HTTP:** 422 Unprocessable Content

- **Retorno:**
    ```json
   {
	"message": "O campo email é obrigatório (and 1 more error)",
	"errors": {
		"email": [
			// Mensagens de erro específicas para o campo "email"
		],
		"password": [
			// Mensagens de erro específicas para o campo "password"
		]
	}
    }
    ```


## Rotas Autenticadas por token tipo Bearer

### Erro de autenticão nas rotas

- **Código HTTP:** 401 Unauthorized

- **Retorno:**
    ```json
    {
        "message": "Unauthenticated."
    }
    ```

## Rota api/auth/logout

### Método: POST

### Campos Necessários

- `token` (string): Token de autenticação do usuário no formato Bearer no header da requisição

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
        "message": "Logout realizado com sucesso!"
    }
    ```

#### Dados Inválidos

- **Código HTTP:** 500 Internal Server Error

- **Retorno:**
    ```json
    {
        "message": "Erro ao realizar logout!."
    }
    ```

## Rota api/auth/validate

### Método: GET

### Campos Necessários

- `token` (string): Token de autenticação do usuário no formato Bearer no header da requisição

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
        "message": "Token válido"
    }

#### Dados Inválidos

- **Código HTTP:** 401 Unauthorized

- **Retorno:**
    ```json
    {
        "message": "Unauthenticated."
    }
    ```
  
## Rota api/books

### Método: GET|HEAD

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok
- **Retorno:**
    ```json
    {
        "id": "1",
        "title": "string",
        "author": "string",
        "genre": "string",
        "year": "string",
        "isbn": "string",
        "publisher": "string",
        "edition": "string",
        "image": "string"
    }
    ```
  
#### Erro de autenticação

- **Código HTTP:** 403 Forbidden
- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```
  
#### Erro no retorno
- **Código HTTP:** 500 Internal Server Error
- **Retorno:**
    ```json
    {
        "message": "Erro ao retornar livros {$errorMessage}"
    }
    ```

## Rota api/books/{book}

### Método: GET|HEAD

### Campos Necessários

- `book` (string): Id do livro que será pesquisado

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok
- **Retorno:**
    ```json
    {
        "id": "1",
        "title": "string",
        "author": "string",
        "genre": "string",
        "year": "string",
        "isbn": "string",
        "publisher": "string",
        "edition": "string",
        "image":  "string"
    }
    ```

#### Erro de autenticação

- **Código HTTP:** 403 Forbidden
- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```

#### Erro no retorno
- **Código HTTP:** 500 Internal Server Error
- **Retorno:**
    ```json
    {
        "message": "Erro ao pesquisar livro {$errorMessage}"
    }
    ```

## Rota api/books/

### Método: POST

### Campos Necessários

- title (string): Título do livro
- author (string): Autor do livro
- genre (string): Gênero do livro
- year (string): Ano de publicação do livro
- isbn (string): Código ISBN do livro
- publisher (string): Editora do livro
- edition (string): Edição do livro
- image (file): Imagem de capa do livro [max: 2048MB, format: jpg,"jpeg","png","webp"]

### Respostas

#### Sucesso

- **Código HTTP:** 201 Created
- **Retorno:**
    ```json
    {
        "message": "Livro Cadastrado com sucesso",
        "idLivro": "{idLivroCadastrado}"
    }
    ```

#### Erro de autenticação

- **Código HTTP:** 403 Forbidden
- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```

#### Erro no retorno
- **Código HTTP:** 500 Internal Server Error
- **Retorno:**
    ```json
    {
        "message": "Erro ao cadastrar livro {$errorMessage}"
    }
    ```

## Rota api/books/{book}

### Método: PUT|PATCH

### Campos Necessários

- title (string|optional): Título do livro
- author (string|optional): Autor do livro
- genre (string|optional): Gênero do livro
- year (string|optional): Ano de publicação do livro
- isbn (string|optional): Código ISBN do livro
- publisher (string|optional): Editora do livro
- edition (string|optional): Edição do livro
- image (file|optional): Imagem de capa do livro [max: 2048MB, format: jpg,"jpeg","png","webp"]

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok
- **Retorno:**
    ```json
    {
        "message": "Livro atualizado com sucesso",
        "idLivro": "{idLivroAtualizado}"
    }
    ```

#### Erro de autenticação

- **Código HTTP:** 403 Forbidden
- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```

#### Erro no retorno
- **Código HTTP:** 500 Internal Server Error
- **Retorno:**
    ```json
    {
        "message": "Erro ao atualizar livro {$errorMessage}"
    }
    ```

## Rota api/books/{book}

### Método: DELETE

### Campos Necessários

- book (string): Id do livro que sera removido

### Respostas

#### Sucesso

- **Código HTTP:** 204 No content
- **Retorno:**
    ```json
    {
        "message": "Livro removido com sucesso",
        "idLivro": "{idLivroAtualizado}"
    }
    ```

#### Erro de autenticação

- **Código HTTP:** 403 Forbidden
- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```

#### Erro no retorno
- **Código HTTP:** 500 Internal Server Error
- **Retorno:**
    ```json
    {
        "message": "Erro ao deletar livro {$errorMessage}"
    }
    ```

# Rota de Reservas de Livros

## Rota api/reservation

### Método: GET

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
        {
        "id": "1",
        "user_id": "1",
        "book_id": "1",
        "from": "2021-09-01",
        "to": "2021-09-15",
        "status": "('pending', 'approved', 'returned', 'canceled',  'expired', 'overdue')"
        }
    }
    ```

#### Erro de autenticação

- **Código HTTP:** 403 Forbidden

- **Retorno:**
    ```json
    {
        "message": "Não autorizado"
    }
    ```

## Rota api/reservation

### Método: GET

### Campos Necessários

- `Bearer token` (string): Token de autenticação do usuário no formato Bearer no header da requisição

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
        {
        "id": "1",
        "user_id": "1",
        "book_id": "1",
        "from": "2021-09-01",
        "to": "2021-09-15",
        "status": "('pending', 'approved', 'returned', 'canceled',  'expired', 'overdue')"
        }
    }
    ```

## Rota api/reservation

### Método: POST

### Campos Necessários

- book_id (string): Id do livro que está sendo reservado
- from (string): Data de início da reserva (Minimo de 1 dia a partir da data atual)
- to (string): Data de término da reserva (Maximo de 7 dias a partir da data de início)

### Respostas

#### Sucesso

- **Código HTTP:** 201 Created

- **Retorno:**
    ```json
    {
        {
            "book_id": 27,
            "user_id": 27,
            "from": "2024-08-27",
            "to": "2024-09-02",
            "status" : "pending",
            "updated_at" : "2024-08-26T02:28:53.000000Z",
            "created_at" : "2024-08-26T02:28:53.000000Z",
            "id" : 11
        }
    }
    ```

#### Erro de validaçao

- **Código HTTP:** 422 Unprocessable Entity

- **Retorno:**
    ```json
    {
        "message": "O campo book_id é obrigatório (and 1 more error)",
        "errors": {
            "book_id": [
                // Mensagens de erro específicas para o campo "book_id"
            ],
            "from": [
                // Mensagens de erro específicas para o campo "from"
            ],
            "to": [
                // Mensagens de erro específicas para o campo "to"
            ]
        }
    }
    ```

### Rota api/reservation/{reservation}

### Método: PUT

### Campos Necessários

- from (string): Data de início da reserva (Minimo de 1 dia a partir da data atual)
- to (string): Data de término da reserva (Maximo de 7 dias a partir da data de início)

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
        "book_id": 27,
        "user_id": 27,
        "from": "2024-08-27",
        "to": "2024-09-02",
        "status" : "pending",
        "updated_at" : "2024-08-26T02:28:53.000000Z",
        "created_at" : "2024-08-26T02:28:53.000000Z",
        "id" : 11
    }
    ```

### Erro de validaçao

#### Erro de Reserva Não Encontrada

- **Código HTTP:** 404 Not Found

- **Retorno:**
    ```json
    {
        "message": "Reserva não encontrada"
    }
    ```

#### Erro reserva com status imuutavel (Devolveu ou Cancelado)

- **Código HTTP:** 422 Unprocessable Entity

- **Retorno:**
    ```json
    {
        "message": "Reserva não pode ser atualizada"
    }
    ```

## Rota api/reservation/{reservation}

### Método: DELETE

### Respostas

#### Sucesso

- **Código HTTP:** 204 No Content

- **Retorno:**
    ```json
    {
        "message": "Reserva removida com sucesso"
    }
    ```

#### Erro de validaçao

- **Código HTTP:** 404 Not Found

- **Retorno:**
    ```json
    {
        "message": "Reserva não encontrada"
    }
    ```

#### Erro de reserva com status imuutavel (Devolveu ou Cancelado)

- **Código HTTP:** 422 Unprocessable Entity

- **Retorno:**
    ```json
    {
        "message": "Reserva não pode ser removida"
    }
    ```


