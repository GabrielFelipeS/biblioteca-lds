import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {CadastrarLivro} from "./pages/CadastrarLivro";
import {EditBook} from "./pages/EditBook.tsx";
import {Acervo} from "./pages/Acervo.tsx";
import { Emprestimo } from "./pages/Emprestados.tsx";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/acervo"} element={<Acervo/>}/>
                <Route path={"/emprestimo"} element={<Emprestimo/>}/>
                <Route path={"/livro/cadastrar"} element={<CadastrarLivro/>}/>
                <Route path={"/livro/editar/:id"} element={<EditBook/>}/>
                <Route path={"/*"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}