import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {CadastrarLivro} from "./pages/CadastrarLivro";
import {Logout} from "./pages/Logout.tsx";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/cadastrarLivro"} element={<CadastrarLivro/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
                <Route path={"/*"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}