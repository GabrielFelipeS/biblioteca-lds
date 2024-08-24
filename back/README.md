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
