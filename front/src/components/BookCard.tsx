import { useEffect, useState } from "react"
import { Reservation } from "../types/Reservation"
import { LivroEmpty } from "../types/Book"
import { api, dominio } from "../services/api";
import Swal from "sweetalert2";

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

    function handleRenewal(id: number) {
        const date = new Date()
        date.setDate(date.getDate() + 6)

        Swal.fire({
            title: "Você tem certeza?",
            text: `Você não vai poder reverter o processo!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, renovar o livro!",
            cancelButtonText: "Cancelar"
        }).then(response => {
            if (response.isConfirmed) {
                api.put(`reservation/${id}/renewal`,
                    {
                        to: date
                    },
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: bearer
                        }
                    }).then( () => {
                        Swal.fire({
                            title: "Renovado!",
                            text: "Livro renovado com sucesso.",
                            icon: "success"
                        });
                    })
                    .catch(e => console.log(e))
            }
        })
    }

    return (
        <div className="w-1/3 rounded overflow-hidden shadow-lg bg-white relative group">
            <img className="w-full" src={image} alt="Capa do Livro" />

            <div className="px-3 py-2">
                <div className="font-bold text-sm">{book.title}</div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleRenewal(reservation.id)} className="bg-ligth-background text-white font-bold py-2 px-4 rounded">Renovar</button>
            </div>
        </div>
    )
}