import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BookCard } from "../components/BookCard";
import { NavBar } from "../components/NavBar";
import { AuthContext } from "../Router";
import { api } from "../services/api";
import { VerifyAuth } from "../services/VerifyAuth";
import { LivroEmpty } from "../types/Book";
import { Reservation } from "../types/Reservation";

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

    function handleRenewal(id: string) {
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
                    }).then(() => {
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
        <div className={"bg-ligth-background_secondary min-h-screen pb-20"}>
            <NavBar />

            <div className="flex flex-col items-center pt-7 ">
                <div className="w-3/5 bg-white mt-9 text-ligth-button h-min p-10 drop-shadow-lg ">
                    <h1 className="ml-4 mt-1 mb-10 font-bold text-center text-xl">Livros emprestados</h1>

                    <div className="flex flex-wrap justify-evenly gap-1">
                        {reservations &&
                            reservations
                                .filter(reservation => reservation.status === "approved")
                                .map((reservation, index) => (
                                    <BookCard 
                                        key={index} 
                                        book_id={reservation.book_id} 
                                        handle={() => handleRenewal(reservation.id.toString())} 
                                        buttonText="reservar" />
                                ))}

                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center pt-7 ">

                <div className={`h-min w-2/3 mt-5 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Pedidos de reserva pendentes
                    </div>

                    <table className={"relative overflow-x-auto w-full pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-6 py-3 hidden lg:table-cell">Titulo</th>
                                <th className="px-6 py-3 hidden lg:table-cell max-sm:hidden">ISBN</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data para emprestimo</th>
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