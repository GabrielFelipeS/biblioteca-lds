import { NavBar } from "../components/NavBar";
import { useContext, useState } from "react";
import { Book, LivroEmpty } from "../types/Book.ts";
import { FormLivro } from "../components/FormLivro.tsx";
import { api } from "../services/api.ts";
import { BackArrow } from "../components/BackArrow.tsx";
import { useNavigate } from "react-router-dom";
import { VerifyAuth } from "../services/VerifyAuth.tsx";
import { AuthContext } from "../components/AuthProvider.tsx";
import { Erro } from "../types/Erro.ts";
import { Errors } from "../components/Errors.tsx";

export function CadastrarLivro() {
    const [book, setBook] = useState<Book>(LivroEmpty)
    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate()

    const [errors, setErrors] = useState<Erro[]>([]); 

    const { isAdmin } = useContext(AuthContext)

    VerifyAuth(isAdmin);


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

            // Limite de tamanho do arquivo (2048MB)
        const maxFileSizeMB = 2048; // MB
        const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

        if (book.file.size > maxFileSizeBytes) {
            const errorId = new Date().getTime();
            const newError = { id: errorId, message: `O arquivo deve ser menor que ${maxFileSizeMB} MB` };
            generatedError(errorId, newError);
            return;
        }


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

        api.post("books", data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearer
                }
            }
        ).then(response => {
            if (response.status == 201) {
                navigate(`/livro/ficha/${response.data.idLivro}`)
            }
        }) .catch(err => {  
            const errorId = new Date().getTime();
            const newError = { id: errorId, message: err.response.data.message };
            generatedError(errorId, newError);
        })
    }

    function generatedError(errorId: number, newError: any) {
        setErrors([...errors, newError]);  

        setTimeout(() => {
            setErrors((prevErrors) => prevErrors.filter(error => error.id !== errorId));
        }, 5000);
    }

    return (
        <div className={"bg-ligth-background_secondary w-full h-full"}>
            <NavBar />
            <BackArrow />
            <Errors errors={errors}/>
            <div className={` w-full flex justify-center pt-14`}>
                <FormLivro
                    handleSubmit={handleSubmit}
                    livro={book}
                    setLivro={setBook}
                    title={"Cadastrar livro"}
                    buttonLabel={"Cadastrar"} />
            </div>

    

        </div>
    )
}