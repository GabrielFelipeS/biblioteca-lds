import {NavBar} from "../components/NavBar";
import {useState} from "react";
import {Book, LivroEmpty} from "../Book.ts";
import {FormLivro} from "../components/FormLivro.tsx";

export function CadastrarLivro() {
    const [livro, setLivro] = useState<Book>(LivroEmpty)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar/>

            <div className={`h-min w-full flex justify-center pt-14`}>
               <FormLivro
                   handleSubmit={handleSubmit}
                   livro={livro}
                   setLivro={setLivro}
                   title={"Cadastrar livro"}
                   buttonLabel={"Cadastrar"}/>
            </div>
        </div>
    )
}