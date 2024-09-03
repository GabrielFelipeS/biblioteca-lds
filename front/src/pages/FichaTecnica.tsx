import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Book, LivroEmpty } from "../types/Book";
import { useParams } from "react-router-dom";
import { api, dominio } from "../services/api";
import { BackArrow } from "../components/BackArrow";
import { VerifyAuth } from "../services/VerifyAuth";
import { AuthContext } from "../components/AuthProvider";

export function FichaTecnica() {
    const { id } = useParams()
    const [book, setBook] = useState<Book>(LivroEmpty)
    const bearer = "Bearer " + localStorage.getItem("token");

    const image = book.image.includes("storage") ? dominio + book.image : book.image

    const {isLoggedIn} = useContext(AuthContext)

    VerifyAuth(isLoggedIn);

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

    return (
        <div className={"bg-ligth-background_secondary pb-20 h-full w-full"}>
            <NavBar />
            <BackArrow/>
            <div className="flex justify-center pt-14">
                <div className={`h-full w-full flex flex-col justify-center items-center`}>
                    <div className="w-2/4 h-min bg-white mt-9 pb-4 sm:pb-20 text-ligth-button drop-shadow-lg">
                        <p className="ml-4 mt-1 text-center font-bold text-lg">Ficha tecnica</p>
                        <div className="mt-5 ml-2 mr-2 flex flex-col items-center md:flex-row">

                            <img src={image} alt="imagem do livro" className="w-28 h-44 sm:w-48 sm:h-72 sm:mr-5 mb-3 sm:mb-0"/>

                            <div className="bg-ligth-background_secondary mb-3 w-5/6 sm:w-2/3 p-2">
                                <p className="mb-3 text-center"><strong>{book.title}</strong></p>

                                <p>Código ISBN: {book.isbn}</p>
                                <p>Autor: {book.author}</p>
                                <p>Edição: {book.edition}</p>
                                <p>Gênero: {book.genre}</p>
                                <p>Lançamento: {book.year}</p>

                                <div className="mt-6 mb-5 flex justify-center">
                                    <button className="rounded-2xl px-5 sm:px-9 py-3 bg-ligth-dark_gray text-ligth-ligth_gray">Reservar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}