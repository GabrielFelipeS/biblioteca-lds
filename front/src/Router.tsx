import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { CadastrarLivro } from "./pages/CadastrarLivro";
import { EditBook } from "./pages/EditBook.tsx";
import { Acervo } from "./pages/Acervo.tsx";
import { Emprestimo } from "./pages/Emprestimo.tsx";
import { MeusEmprestimos } from "./pages/MeusEmprestimos.tsx";
import { FichaTecnica } from "./pages/FichaTecnica.tsx";
import { createContext, useEffect, useState } from "react";
import { api } from "./services/api.ts";
import PrivateRoute from "./components/PrivateRoute.tsx";

interface AuthContextType {
    role: string
}

export const AuthContext = createContext<AuthContextType>({ role: "visitor" });

export function Router() {
    const [role, setRole] = useState<string>("visitor")
    const bearer = "Bearer " + localStorage.getItem("token");

    const isAdmin: boolean = role.includes("bibliotecario")
    const notIsLoggedIn: boolean = role.includes("visitor")
    const isLoggedIn: boolean = !notIsLoggedIn

    useEffect(() => {
        api
            .get("auth/validate",
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: bearer
                    }
                })
            .then(response => response.data.type)
            .then(type => {

                setRole(type)
            })
            .catch(e => {
                localStorage.clear()
                console.log(e)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ role }}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/home"} element={<Home />} />

                    <Route element={<PrivateRoute condition={notIsLoggedIn} />}>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/register"} element={<Register />} />
                    </Route>

                    <Route element={<PrivateRoute condition={isLoggedIn} />}>
                        <Route path={"/emprestimo"} element={<Emprestimo />} />
                        <Route path={"/user/emprestimo"} element={<MeusEmprestimos />} />
                        <Route path={"/livro/ficha/:id"} element={<FichaTecnica />} />
                    </Route>

                    <Route element={<PrivateRoute condition={isAdmin} />}>
                        <Route path={"/acervo"} element={<Acervo />} />
                        <Route path={"/livro/cadastrar"} element={<CadastrarLivro />} />
                        <Route path={"/livro/editar/:id"} element={<EditBook />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}