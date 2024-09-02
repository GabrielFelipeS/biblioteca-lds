import { LoginList } from "./LoginList.tsx";
import { LiNavBar as Li } from "./LiNavBar.tsx";
import { NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api.ts";
import { When } from "./When.tsx";

interface MenuNavBarProps {
    navigate: NavigateFunction
}

export function MenuNavBar({ navigate }: MenuNavBarProps) {
    const [role, setRole] = useState<string>("")

    const bearer = "Bearer " + localStorage.getItem("token");

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
        .then(response => {
            console.log(response.data)
            return response.data.type
        })
        .then(type => {
            console.log(type)
            setRole(type)
        })
        .catch(e => {
            localStorage.clear()
            console.log(e)
        })
    }, [])
    
    return (
        <>
            <Li endPoint={"/home"} navigate={navigate}>Inicio</Li>

            <When expr={() => ["bibliotecario"].includes(role)}>
                <Li endPoint={"/acervo"} navigate={navigate}>Acervo</Li>
                <Li endPoint={"/livro/cadastrar"} navigate={navigate}>Cadastrar Livro</Li>
            </When>

            <When expr={() => ["usuario", "bibliotecario"].includes(role)}>
                <Li endPoint={"/emprestimo"} navigate={navigate}>Emprestimos</Li>
            </When>

            <LoginList />
        </>
    )
}