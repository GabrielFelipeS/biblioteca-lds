import {useNavigate} from "react-router-dom";

interface ListItemProps {
    children: React.ReactNode;
    endPoint: string;
}

export function NavBar() {
    const navigate = useNavigate()
    const currentEndpoint = window.location.pathname;

    const Li = ({children, endPoint}: ListItemProps ) => {
        const condition = endPoint.includes(currentEndpoint);

        return (
            <li onClick={() => navigate(endPoint)}
                className=
                    {`cursor-pointer hover:bg-ligth-selected text-ligth-primary 
                     font-bold h-full flex items-center pl-2 pr-2
                     ${condition ? 'bg-ligth-selected' : ''} `}
            >
                {children}
            </li>
        )
    }

    return (
        <div className="flex justify-around items-center bg-ligth-background h-20 cursor-pointer">
            <div className="w-full ml-5 font-bold text-4xl" onClick={() => navigate("/home")}>
                Bibliotex
            </div>

            <div className="w-full h-full">
               <ul id={"menu"} className="flex flex-row  h-full">
                   <Li endPoint={"/home"}>Inicio</Li>
                   <Li endPoint={"/acervo"}>Acervo</Li>
                   <Li endPoint={"/cadastrarLivro"}>Cadastrar Livro</Li>
                   <Li endPoint={"/emprestimo"}>Emprestimos</Li>
                   <Li endPoint={"/logout"}>Sair</Li>
               </ul>
            </div>
        </div>
    )
}