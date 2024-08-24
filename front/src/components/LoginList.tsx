import {LiNavBar as Li, style} from "./LiNavBar.tsx";
import {logout} from "../services/Logout.ts";
import {useNavigate} from "react-router-dom";

export function LoginList() {
    const token = localStorage.getItem("token") ?? ""
    const condition = token?.trim().length != 0;
    const navigate = useNavigate()

    return (
        <>
            {
                condition ?
                    <li onClick={() => logout(navigate)} className={style(null)}>Sair</li>
                    :
                <>
                    <Li endPoint={"/login"} navigate={navigate}>Login</Li>
                    <Li endPoint={"/register"} navigate={navigate}>Cadastro</Li>
                </>
            }

        </>
)
}
