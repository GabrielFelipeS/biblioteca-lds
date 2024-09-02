import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { AuthContext } from "../Router";
import { VerifyAuth } from "../services/VerifyAuth";
import {Reservation } from "../types/Reservation";
import { api } from "../services/api";
import { BookCard } from "../components/BookCard";
import { LivroEmpty } from "../types/Book";

interface LineProps {
    index: number
    reservation: Reservation
}

function Line({ index, reservation }: LineProps) {
    const [book, setBook] = useState(LivroEmpty);
    const bearer = "Bearer " + localStorage.getItem("token");

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
        <tr className="h-12" key={index}>
            <td className="px-6 max-sm:px-0 hidden lg:table-cell max-sm:py-0 border max-sm:text-xs break-words">{book.title}</td>
            <td className="px-6 border hidden lg:table-cell max-sm:hidden break-words text-center">{book.isbn}</td>
            <td className="px-6 border max-sm:text-xs break-words text-center">{reservation.from}</td>
            <td className="px-6 border max-sm:text-xs text-center break-words">{reservation.to}</td>
        </tr>
    )
}


export function MeusEmprestimos() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const bearer = "Bearer " + localStorage.getItem("token");

    const { isLoggedIn } = useContext(AuthContext)

    VerifyAuth(isLoggedIn);

    useEffect(() => {
        api.get("reservation",
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: bearer
                }
            })
            .then(response => {
                setReservations(response.data)
            })
            .catch(e => console.log(e))
    }, [])

   

    return (
        <div className={"bg-ligth-background_secondary min-h-screen pb-20"}>
            <NavBar />

            <div className="flex flex-col items-center pt-7 ">
              

                <div className="w-3/5 bg-white mt-9 text-ligth-button h-min p-10 drop-shadow-lg ">
                    <h1 className="ml-4 mt-1 mb-10 font-bold text-center text-xl">Livros emprestados</h1>

                    <div className="flex gap-1">
                        {reservations &&
                            reservations
                                .filter(reservation => reservation.status === "approved")
                                .map((reservation, index) => (
                                    <BookCard key={index} reservation={reservation} />
                                ))}

                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center pt-7 ">

                <div className={`h-min w-2/3 mt-5 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Livros pendentes para ser reservado
                    </div>

                    <table className={"relative overflow-x-auto w-full pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-6 py-3 hidden lg:table-cell">Titulo</th>
                                <th className="px-6 py-3 hidden lg:table-cell max-sm:hidden">ISBN</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de emprestimo</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de devolução</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations &&
                                Array.isArray(reservations) &&
                                reservations.filter(reservation => reservation.status === "pending").length > 0 ? (
                                reservations
                                    .filter(reservation => reservation.status === "pending")
                                    .map((reservation, index) => (
                                        <Line index={index} reservation={reservation} />
                                    )
                                    )) :
                                (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-3 text-center">Nenhuma reserva pendente</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}