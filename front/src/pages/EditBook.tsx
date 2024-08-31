import {NavBar} from "../components/NavBar.tsx";
import {FormLivro} from "../components/FormLivro.tsx";
import {useState} from "react";
import {Book, LivroEmpty} from "../types/Book.ts";

export function EditBook() {
    const [book, setBook] = useState<Book>(LivroEmpty)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return(
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar/>

            <div className={`h-min w-full flex justify-center pt-14`}>
                <FormLivro
                    handleSubmit={handleSubmit}
                    livro={book}
                    setLivro={setBook}
                    title={"Editar livro"}
                    buttonLabel={"Editar"}/>
            </div>
        </div>
    )
}