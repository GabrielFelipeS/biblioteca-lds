# Documentação da API

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
