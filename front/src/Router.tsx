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
import { Reservar } from "./pages/Reservar.tsx";

interface AuthContextType {
    role: string
    setRole:  React.Dispatch<React.SetStateAction<string>>
    isAdmin: boolean
    notIsLoggedIn: boolean
    isLoggedIn: boolean
}

export const AuthContext = createContext<AuthContextType>({ role: "visitor", setRole: () => {} ,isAdmin: false, notIsLoggedIn: true, isLoggedIn: false });

export function Router() {
    const [role, setRole] = useState<string>("visitor")
    const bearer = "Bearer " + localStorage.getItem("token");
    console.log("SIM")
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
        <AuthContext.Provider value={{ role, setRole, isAdmin, isLoggedIn, notIsLoggedIn }}>
            <BrowserRouter>
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
            </BrowserRouter>
        </AuthContext.Provider>
    )
}