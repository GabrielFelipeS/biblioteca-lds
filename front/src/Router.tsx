import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {Home} from "./pages/Home.tsx";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/*"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}