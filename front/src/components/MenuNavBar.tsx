import { LoginList } from "./LoginList.tsx";
import { LiNavBar as Li } from "./LiNavBar.tsx";
import { NavigateFunction } from "react-router-dom";
import { useState } from "react";

interface MenuNavBarProps {
    navigate: NavigateFunction
}


export function MenuNavBar({ navigate }: MenuNavBarProps) {


    return (
        <>
            <Li endPoint={"/home"} navigate={navigate}>Inicio</Li>;
            <Li endPoint={"/acervo"} navigate={navigate}>Acervo</Li>
            <Li endPoint={"/livro/cadastrar"} navigate={navigate}>Cadastrar Livro</Li>
            <Li endPoint={"/emprestimo"} navigate={navigate}>Emprestimos</Li>
            <LoginList />
        </>
    )
}