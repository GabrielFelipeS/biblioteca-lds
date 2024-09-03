import { NavBar } from "../components/NavBar.tsx";
import { FormLivro } from "../components/FormLivro.tsx";
import { useContext, useEffect, useState } from "react";
import { Book, LivroEmpty } from "../types/Book.ts";
import { useParams } from "react-router-dom";
import { api } from "../services/api.ts";
import { BackArrow } from "../components/BackArrow.tsx";
import { VerifyAuth } from "../services/VerifyAuth";
import { AuthContext } from "../components/AuthProvider.tsx";

export function EditBook() {
    const [book, setBook] = useState<Book>(LivroEmpty)
    const { id } = useParams();
    const bearer = "Bearer " + localStorage.getItem("token");

    const {isAdmin} = useContext(AuthContext)

    VerifyAuth(isAdmin);

    useEffect(() => {
        api.get(`books/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearer
                }
            }
        ).then(response => {
            setBook(response.data)
        }).catch(e => console.log(e))
    }, [])

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


        api.put(`books/${book.id}` ,data,
            {headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: bearer
            }}
        ).then(response => {
                console.log(response)
            }).catch(e => console.log(e))
        console.log(id)
    }

    return (
        <div className={"bg-ligth-background_secondary w-full h-full"}>
            <NavBar />
            <BackArrow/>
            <div className={`min-h-screen w-full flex justify-center pt-14`}>
                <FormLivro
                    handleSubmit={handleSubmit}
                    livro={book}
                    setLivro={setBook}
                    title={"Editar livro"}
                    buttonLabel={"Editar"} />
            </div>
        </div>
    )
}