import { LoginList } from "./LoginList.tsx";
import { LiNavBar as Li } from "./LiNavBar.tsx";
import { NavigateFunction } from "react-router-dom";
import { useContext } from "react";
import { When } from "./When.tsx";
import { AuthContext } from "../Router.tsx";

interface MenuNavBarProps {
    navigate: NavigateFunction
}

export function MenuNavBar({ navigate }: MenuNavBarProps) {
    const {role} = useContext(AuthContext)
 
    return (
        <>
            <Li endPoint={"/home"} navigate={navigate}>Inicio</Li>

            <When expr={() => ["bibliotecario"].includes(role)}>
                <Li endPoint={"/acervo"} navigate={navigate}>Acervo</Li>
                <Li endPoint={"/livro/cadastrar"} navigate={navigate}>Cadastrar Livro</Li>
            </When>

            <When expr={() => ["usuario"].includes(role)}>
                <Li endPoint={"/user/emprestimo"} navigate={navigate}>Meus Emprestimos</Li>
            </When>

            <When expr={() => ["bibliotecario"].includes(role)}>
                <Li endPoint={"/emprestimo"} navigate={navigate}>Emprestimos</Li>
            </When>

            <LoginList />
        </>
    )
}