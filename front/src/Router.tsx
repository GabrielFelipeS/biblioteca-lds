import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { CadastrarLivro } from "./pages/CadastrarLivro";
import { EditBook } from "./pages/EditBook.tsx";
import { Acervo } from "./pages/Acervo.tsx";
import { Emprestimo } from "./pages/Emprestimo.tsx";
import { MeusEmprestimos } from "./pages/MeusEmprestimos.tsx";
import { FichaTecnica } from "./pages/FichaTecnica.tsx";
import { Reservar } from "./pages/Reservar.tsx";
import { AuthProvider } from "./components/AuthProvider.tsx";

export function Router() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={"/home"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/emprestimo"} element={<Emprestimo />} />
                    <Route path={"/reservar/:id"} element={<Reservar />} />
                    <Route path={"/user/emprestimo"} element={<MeusEmprestimos />} />
                    <Route path={"/livro/ficha/:id"} element={<FichaTecnica />} />
                    <Route path={"/acervo"} element={<Acervo />} />
                    <Route path={"/livro/cadastrar"} element={<CadastrarLivro />} />
                    <Route path={"/livro/editar/:id"} element={<EditBook />} />
                    <Route path="/*" element={<Navigate to="/home" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}