import { useEffect, useState } from "react"
import { Reservation } from "../types/Reservation"
import { LivroEmpty } from "../types/Book"
import { api, dominio } from "../services/api";

interface BookCardProps {
    reservation: Reservation
}

export function BookCard({reservation}: BookCardProps) {
    const [book, setBook] = useState(LivroEmpty);
    const bearer = "Bearer " + localStorage.getItem("token");
    
    const image = book.image.includes("storage") ? dominio + book.image : book.image

    useEffect(() => {
        api.get(`books/${reservation.book_id}`,
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
        <div className="w-1/3 rounded overflow-hidden shadow-lg bg-white relative group">
            <img className="w-full" src={image} alt="Capa do Livro" />

            <div className="px-3 py-2">
                <div className="font-bold text-sm">{book.title}</div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-ligth-background text-white font-bold py-2 px-4 rounded">Renovar</button>
            </div>
        </div>
    )
}