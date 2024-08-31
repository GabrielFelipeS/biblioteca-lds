import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Book, LivroEmpty } from "../types/Book";
import { useParams } from "react-router-dom";
import { api, dominio } from "../services/api";

export function FichaTecnica() {
    const { id } = useParams()
    const [book, setBook] = useState<Book>(LivroEmpty)
    const bearer = "Bearer " + localStorage.getItem("token");

    const image = book.image.includes("storage") ? dominio + book.image :  book.image

    console.log("aqui" + document.referrer)

    useEffect(() => {
        api.get(`books/${id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearer
                }
            }
        ).then(response => {
            console.log(response)
            setBook(response.data)
        }).catch(e => console.log(e))
    }, [])

    return (
        <div className={"bg-ligth-background_secondary pb-20 h-full w-full"}>
        <NavBar />
       
        <div className="flex justify-center pt-14">
            <div className={`h-full w-full flex flex-col justify-center items-center`}>
  
                <div className="w-2/5 bg-white mt-9 text-ligth-button h-40 drop-shadow-lg">
                    <p className="ml-4 mt-1">Ficha tecnica</p>
                    <div>
                        <img src={image} alt="" />
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}