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
