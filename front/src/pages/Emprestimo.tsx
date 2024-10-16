import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { api } from "../services/api";
import { Reservation } from "../types/Reservation";
import Swal from "sweetalert2";
import { VerifyAuth } from "../services/VerifyAuth";
import { AuthContext } from "../components/AuthProvider";
import { LivroEmpty } from "../types/Book";

interface LineProps {
    index: number
    reservation: Reservation
    handle: (id: number) => void
    textButton: string
}

function Line({ index, reservation, handle, textButton }: LineProps) {
    const [book, setBook] = useState(LivroEmpty);
    const bearer = "Bearer " + localStorage.getItem("token");

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

    return (
        <tr className="h-12" key={index}>
            <td colSpan={2} className="px-2 cursor-pointer border" onClick={() => handle(reservation.id)}>
                <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs text-center" >{textButton} </div>
            </td>
            <td className="px-6 max-sm:px-0 hidden lg:table-cell max-sm:py-0 border max-sm:text-xs break-words">{book.title}</td>
            <td className="px-6 border hidden lg:table-cell max-sm:hidden break-words">{book.isbn}</td>
            <td className="px-6 border max-sm:text-xs break-words">{reservation.from}</td>
            <td className="px-6 border max-sm:text-xs text-center break-words">{reservation.to}</td>
        </tr>
    )
}

export function Emprestimo() {
    const [load, setLoad] = useState(true)

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const bearer = "Bearer " + localStorage.getItem("token");

    const { isLoggedIn } = useContext(AuthContext)

    VerifyAuth(isLoggedIn);

    useEffect(() => {
        api.get("admin/reservations",
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: bearer
                }
            })
            .then(response => {
                console.log(response)
                setReservations(response.data)
            })
            .catch(e => console.log(e))
    }, [load])

    function handleApproved(id: number) {
        Swal.fire({
            title: "Você tem certeza?",
            text: `Você não vai poder reverter o processo!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, aceitar reserva do livro!",
            cancelButtonText: "Cancelar"
        }).then(response => {
            if (response.isConfirmed) {
                api.put(`admin/reservations/${id}/status`,
                    {
                        status: "approved"
                    },
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: bearer
                        }
                    })
                    .then(() => {
                        setLoad(state => !state)
                    })
                    .catch(e => console.log(e))
            }
        })
    }

    function handlRenewal(id: number) {
        Swal.fire({
            title: "Você tem certeza?",
            text: `Você não vai poder reverter o processo!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, aceitar reserva do livro!",
            cancelButtonText: "Cancelar"
        }).then(response => {
            if (response.isConfirmed) {
                api.delete(`admin/reservations/${id}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: bearer
                        }
                    })
                    .then(() => {
                        setLoad(state => !state)
                    })
                    .catch(e => console.log(e))
            }
        })
    }

    return (
        <div className={"bg-ligth-background_secondary min-h-screen"}>
            <NavBar />

            <div className="flex flex-col items-center pt-7 ">


                <div className={`h-min w-min mt-5 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Pedidos de reserva
                    </div>

                    <table className={"relative overflow-x-auto pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
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
                                    .map((reservation, index) => {
                                        const MOCKADO = 'MOCKADO'

                                        return (
                                            <tr className="h-12" key={index}>
                                                <td colSpan={2} className="px-2 cursor-pointer border" onClick={() => handleApproved(reservation.id)}>
                                                    <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs text-center" >Aceitar reserva </div>
                                                </td>
                                                <td className="px-6 max-sm:px-0 hidden lg:table-cell max-sm:py-0 border max-sm:text-xs break-words">{MOCKADO}</td>
                                                <td className="px-6 border hidden lg:table-cell max-sm:hidden break-words">{MOCKADO}</td>
                                                <td className="px-6 border max-sm:text-xs break-words">{reservation.from}</td>
                                                <td className="px-6 border max-sm:text-xs text-center break-words">{reservation.to}</td>
                                            </tr>
                                        )
                                    })) :
                                (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-3 text-center">Nenhum livro para ser reservado</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className={`h-min w-min mt-5 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Livros para serem devolvidos
                    </div>

                    <table className={"relative overflow-x-auto pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-6 py-3 hidden lg:table-cell">Titulo</th>
                                <th className="px-6 py-3 hidden lg:table-cell max-sm:hidden">ISBN</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de emprestimo</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de devolução</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations &&
                                Array.isArray(reservations) &&
                                reservations.filter(reservation => reservation.status === "approved").length > 0 ? (
                                reservations
                                    .filter(reservation => reservation.status === "approved")
                                    .map((reservation, index) => {
                                        return (
                                            <Line key={index} index={index} handle={handlRenewal} reservation={reservation} textButton={"Devolver"} />
                                        )
                                    })) :
                                (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-3 text-center">Nenhum livro para ser reservado</td>
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