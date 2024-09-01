import {NavBar} from "../components/NavBar";
import {useState} from "react";
import {Book, LivroEmpty} from "../types/Book.ts";
import {FormLivro} from "../components/FormLivro.tsx";
import {api} from "../services/api.ts";
import { BackArrow } from "../components/BackArrow.tsx";

export function CadastrarLivro() {
    const [book, setBook] = useState<Book>(LivroEmpty)
    const bearer = "Bearer " + localStorage.getItem("token");
    console.log(bearer)
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            isbn: book.isbn,
            publisher: book.publisher,
            edition: book.edition,
            image: book.file
        }

        api.post("books" ,data,
            {headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: bearer
            }}
        ).then(response => {
                console.log(response)
                if(response.status == 201) {
                    //  TODO: enviar para pagina do livro
                }
            }).catch(e => console.log(e))
    }

    return (
        <div className={"bg-ligth-background_secondary w-full h-full"}>
            <NavBar/>
            <BackArrow/>
            <div className={` w-full flex justify-center pt-14`}>
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