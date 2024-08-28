import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {CadastrarLivro} from "./pages/CadastrarLivro";
import {EditBook} from "./pages/EditBook.tsx";
import { Emprestimo } from "./pages/Emprestimo";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/emprestimo"} element={<Emprestimo/>}/>
                <Route path={"/livro/cadastrar"} element={<CadastrarLivro/>}/>
                <Route path={"/livro/editar/:id"} element={<EditBook/>}/>
                <Route path="/*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    )
}