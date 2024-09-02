[# Documentação da API

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
  
# Rotas referente aos livros

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
        "message": "Token válido",
        "type" : "bibliotecario|usuario|null",
        "user" : {
            "id": 1,
            "name": "string",
            "email": "string",
            "email_verified_at": "2024-08-29T21:38:49.000000Z",
            "created_at": "2024-08-29T21:38:49.000000Z",
            "updated_at": "2024-08-29T21:38:49.000000Z"
        }
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
      "current_page": 1,
      "data": [
        {
          "id": 1,
          "title": "Aut aliquam eum.",
          "author": "Amya Dare MD",
          "year": 1984,
          "isbn": "9785185287316",
          "created_at": "2024-08-29T21:38:49.000000Z",
          "updated_at": "2024-08-29T21:38:49.000000Z",
          "genre": "quia",
          "publisher": "Rempel Inc",
          "edition": "10º",
          "image": "https://via.placeholder.com/640x480.png/0088cc?text=sed",
          "deleted_at": null
        },
        {
          "id": 2,
          "title": "Quidem voluptatem consequatur.",
          "author": "Michaela Schulist",
          "year": 2007,
          "isbn": "9780757584978",
          "created_at": "2024-08-29T21:38:49.000000Z",
          "updated_at": "2024-08-29T21:38:49.000000Z",
          "genre": "aperiam",
          "publisher": "McLaughlin Ltd",
          "edition": "5º",
          "image": "https://via.placeholder.com/640x480.png/0011ff?text=hic",
          "deleted_at": null
        }
      ],
      "first_page_url": "http://localhost/api/books?page=1",
      "from": 1,
      "last_page": 2,
      "last_page_url": "http://localhost/api/books?page=2",
      "links": [
        {
          "url": null,
          "label": "&laquo; Previous",
          "active": false
        },
        {
          "url": "http://localhost/api/books?page=1",
          "label": "1",
          "active": true
        },
        {
          "url": "http://localhost/api/books?page=2",
          "label": "2",
          "active": false
        },
        {
          "url": "http://localhost/api/books?page=2",
          "label": "Next &raquo;",
          "active": false
        }
      ],
      "next_page_url": "http://localhost/api/books?page=2",
      "path": "http://localhost/api/books",
      "per_page": 15,
      "prev_page_url": null,
      "to": 15,
      "total": 26
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

## Rota api/books/search/{query}

### Método: GET

### Campos Necessários

- `query` (string): Texto que será pesquisado (a pesquisa sera feita em todos os campos `fillable` do livro)

### Campos Fillable

- `title`
- `author`
- `year`
- `isbn`
- `genre`
- `publisher`
- `edition`

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok
- **Retorno:**
    ```json
    [
        {
        "id": 1,
        "title": "Aut aliquam eum.",
        "author": "Amya Dare MD",
        "year": 1984,
        "isbn": "9785185287316",
        "created_at": "2024-08-29T21:38:49.000000Z",
        "updated_at": "2024-08-29T21:38:49.000000Z",
        "genre": "quia",
        "publisher": "Rempel Inc",
        "edition": "10º",
        "image": "https://via.placeholder.com/640x480.png/0088cc?text=sed",
        "deleted_at": null
      },
      {
        "id": 2,
        "title": "Quidem voluptatem consequatur.",
        "author": "Michaela Schulist",
        "year": 2007,
        "isbn": "9780757584978",
        "created_at": "2024-08-29T21:38:49.000000Z",
        "updated_at": "2024-08-29T21:38:49.000000Z",
        "genre": "aperiam",
        "publisher": "McLaughlin Ltd",
        "edition": "5º",
        "image": "https://via.placeholder.com/640x480.png/0011ff?text=hic",
        "deleted_at": null
      },
    ]       
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

## Rota api/reservation/{reservation}/renewal

### campos necessários

- `to` (string): Data de término da reserva (Maximo de 7 dias a partir da data de início)

### Respostas

#### Sucesso

- **Código HTTP:** 200 Ok

- **Retorno:**
    ```json
    {
       "message": "Reserva renovada com sucesso"
    }
    ```

### Erro de validaçao

#### Reserva não encontrada

- **Código HTTP:** 404 Not Found

- **Retorno:**
    ```json
    {
        "message": "Reserva não encontrada"
    }
    ```

#### Data de retorno maior que 7 dias apartir do pedido de renovação (O dia da requisição)

- **Código HTTP:** 422 Unprocessable Entity

- **Retorno:**
    ```json
    {
        "message": "Data de retorno maior que 7 dias apartir do pedido de renovação"
    }
    ```

#### Tentativa de renovação de reserva com status imutavel (Devolveu ou Cancelado)

- **Código HTTP:** 422 Unprocessable Entity

- **Retorno:**
    ```json
    {
        "message": "Reserva {{status}}"
    }
    ```
  
# Rotas Painel de Admin

### Para acessar as rotas é necessario a role de : `bibliotecario`

## Rota api/admin/reservations

### Método: GET

### Campos Necessarios (Todos São Opcionais)

- `to` (string): Data de término da reserva
- `from` (string): Data de início da reserva
- `status` (string): Status da reserva ('pending', 'approved', 'returned', 'canceled',  'expired', 'overdue')
- `user_id` (string): Id do usuário que fez a reserva
- `book_id` (string): Id do livro reservado

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
### erros de validação

- **Código HTTP:** 422 Unprocessable Entity**

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




]()
