import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {CadastrarLivro} from "./pages/CadastrarLivro";
import {EditBook} from "./pages/EditBook.tsx";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/livro/cadastrar"} element={<CadastrarLivro/>}/>
                <Route path={"/livro/editar/:id"} element={<EditBook/>}/>
            </Routes>
        </BrowserRouter>
    )
}