import {NavBar} from "../components/NavBar";
import {useState} from "react";
import {Book, LivroEmpty} from "../Book.ts";
import {FormLivro} from "../components/FormLivro.tsx";
import {api} from "../services/api.ts";

export function CadastrarLivro() {
    const [book, setBook] = useState<Book>(LivroEmpty)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

           /* title (string): Título do livro
            author (string): Autor do livro
            genre (string): Gênero do livro
            year (string): Ano de publicação do livro
            isbn (string): Código ISBN do livro
            publisher (string): Editora do livro
            edition (string): Edição do livro
            image (file): Imagem de capa do livro [max: 2048MB, format: jpg,"jpeg","png","webp"] */

        const data = {
            title: '',
            author: '',
            genre: '',
            year: '',
            isbn: '',
            publisher: '',
            edition: '',
            image: ''
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
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar/>

            <div className={`h-min w-full flex justify-center pt-14`}>
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