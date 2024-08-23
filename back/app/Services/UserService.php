<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    public function __construct(private UserRepository $userRepository) {}

    public function register(array $data): void
    {
        try {
            $data['password'] = bcrypt($data['password']);
            $this->userRepository->create($data);
        } catch (\Throwable $th) {
            throw new \Exception('Erro ao registrar usuario: ' . $th->getMessage());
        }
    }

    public function login(array $data): string
    {
        try {
            $user = $this->userRepository->findByEmail($data['email']);
            if (!$user || !password_verify($data['password'], $user->password)) {
                throw new \Exception('Credenciais inválidas!');
            }
            return TokenService::generateToken($user);
        } catch (\Throwable $th) {
            throw new \Exception('Erro ao realizar login: ' . $th->getMessage());
        }
    }
}
