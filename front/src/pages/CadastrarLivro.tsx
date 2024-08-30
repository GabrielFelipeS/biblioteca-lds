import {NavBar} from "../components/NavBar";
import {useState} from "react";
import {Book, LivroEmpty} from "../types/Book.ts";
import {FormLivro} from "../components/FormLivro.tsx";
import {api} from "../services/api.ts";

export function CadastrarLivro() {
    const [book, setBook] = useState<Book>(LivroEmpty)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            title: '',
            author: '',
            genre: '',
            year: '',
            isbn: '',
            publisher: '',
            edition: '',
            image: new File([], '')
        }

        api.post("books" ,data)
            .then(response => {
                console.log(response)
                if(response.status == 201) {
                    console.log("FUNCIONOUUUU")
                }
            })
    }

    return (
        <div className={"bg-ligth-background_secondary w-full h-full"}>
            <NavBar/>

            <div className={`h-full w-full flex justify-center pt-14`}>
               <FormLivro
                   handleSubmit={handleSubmit}
                   livro={book}
                   setLivro={setBook}
                   title={"Cadastrar livro"}
                   buttonLabel={"Cadastrar"}/>
            </div>
        </div>
    )
}