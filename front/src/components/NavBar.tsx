import {useNavigate} from "react-router-dom";
import {LoginList} from "./LoginList.tsx";
import {LiNavBar as Li} from "./LiNavBar.tsx";

export function NavBar() {
    const navigate = useNavigate()

    return (
        <div className="flex justify-around items-center bg-ligth-background h-20 cursor-pointer">
            <div className="w-full ml-5 font-bold text-4xl" onClick={() => navigate("/home")}>
                Bibliotex
            </div>

            <div className="w-full h-full">
               <ul id={"menu"} className="flex flex-row  h-full">
                   <Li endPoint={"/home"} navigate={navigate}>Inicio</Li>
                   <Li endPoint={"/acervo"} navigate={navigate}>Acervo</Li>
                   <Li endPoint={"/livro/cadastrar"} navigate={navigate}>Cadastrar Livro</Li>
                   <Li endPoint={"/emprestimo"} navigate={navigate}>Emprestimos</Li>
                    <LoginList/>
               </ul>
            </div>
        </div>
    )
}