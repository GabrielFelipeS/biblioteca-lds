import {LiNavBar as Li, style} from "./LiNavBar.tsx";
import {logout} from "../services/Logout.ts";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Router.tsx";

export function LoginList() {
    const token = localStorage.getItem("token") ?? ""
    const condition = token?.trim().length != 0;
    const navigate = useNavigate()
    const {setRole} = useContext(AuthContext)
    return (
        <>
            {
                condition ?
                    <li onClick={() => {logout(navigate); setRole("visitor")}} className={style(null)}>Sair</li>
                    :
                <>
                    <Li endPoint={"/login"} navigate={navigate}>Login</Li>
                    <Li endPoint={"/register"} navigate={navigate}>Cadastro</Li>
                </>
            }
        </>
)
}
