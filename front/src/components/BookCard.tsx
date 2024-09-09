import { useEffect, useState } from "react"
import { LivroEmpty } from "../types/Book"
import { api, dominio } from "../services/api";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
    book_id: string
    buttonText: string
    handle: () => void
}

export function BookCard({book_id, handle, buttonText}: BookCardProps) {
    const [book, setBook] = useState(LivroEmpty);
    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate()
    const image = book.image.includes("storage") ? dominio + book.image : book.image

    useEffect(() => {
        api.get(`books/${book_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: bearer
                }
            }
        ).then(response => {
            setBook(response.data)
        }).catch(e => console.log(e))    
    })

    return (
        <div className="w-96 rounded overflow-hidden shadow-lg bg-white relative group md:mr-10 mb-5">
            <img className="w-full" src={image} alt="Capa do Livro" />

            <div className="px-3 py-2">
                <div className="font-bold text-sm">{book.title}</div>
            </div>

            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={handle} className="bg-ligth-background text-white font-bold py-2 px-4 rounded">{buttonText}</button>
                <button onClick={() => navigate(`/livro/ficha/${book.id}`)} className="bg-ligth-background text-white font-bold py-2 px-4 rounded">Ver ficha</button>
            </div>
            
        </div>
    )
}