import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { api } from "../services/api";
import { Reservation, reservationsMock } from "../types/Reservation";

export function Emprestimo() {
    const [load, setLoad] = useState(true)

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const bearer = "Bearer " + localStorage.getItem("token");

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
                console.log(response.data)
                // setReservations(response.data)
                setReservations(reservationsMock)
            })
            .catch(e => console.log(e))
    }, [load])

    function handleRenewal(id: number) {
        console.log(id)

        api.put(`reservation/${id}/renewal`, {
            to: '2024-09-01'
        },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: bearer
                }
            })
            .then(response => {
                console.log(response.data)
                setLoad(state => !state)
            })
            .catch(e => console.log(e))
    }

    function handleReturn(id: number) {
        console.log(id)

        api.delete(`reservation/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: bearer
                }
            })
            .then(response => {
                console.log(response.data)
                setLoad(state => !state)
            })
            .catch(e => console.log(e))
    }

    return (
        <div className={"bg-ligth-background_secondary pb-20 min-h-screen"}>
            <NavBar />
            <div className="flex flex-col items-center pt-14 ">


                <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Livros emprestados
                    </div>

                    <table className={"relative overflow-x-auto pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-6 py-3 hidden lg:table-cell">Titulo</th>
                                <th className="px-6 py-3  hidden lg:table-cell max-sm:hidden">ISBN</th>
                                <th className="px-6 py-3">Data de emprestimo</th>
                                <th className="px-6 py-3">Data de devolução</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Usuário</th>
                                <th className="px-6 py-3 hidden lg:table-cell">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations && Array.isArray(reservations) && reservations.map((reservation, index) => {
                                const bookName = 'MOCKADO'
                                const bookIsbn = "MOCKADO";
                                const nome = "MOCKADO"
                                const email = "MOCKADO"

                                const fromString = reservation.from.getDay().toString().padStart(2, '0') + "/" +
                                    reservation.from.getMonth().toString().padStart(2, '0') + "/" +
                                    reservation.from.getFullYear()

                                const toString = reservation.to.getDay().toString().padStart(2, '0') + "/" +
                                    reservation.to.getMonth().toString().padStart(2, '0') + "/" +
                                    reservation.to.getFullYear()
                                return (
                                    <tr className="h-12" key={index}>
                                        <td className="px-2 cursor-pointer border max-sm:px-0  max-sm:py-0" onClick={() => handleRenewal(reservation.id)}>
                                            <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs" >Renovação</div>
                                        </td>
                                        <td className="px-2 cursor-pointer border" onClick={() => handleReturn(reservation.id)}>
                                            <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs" >Devolução </div>
                                        </td>
                                        <td className="px-6  max-sm:px-0 hidden lg:table-cell max-sm:py-0 border max-sm:text-xs">{bookName}</td>
                                        <td className="px-6 border hidden lg:table-cell max-sm:hidden">{bookIsbn}</td>
                                        <td className="px-6 border">{fromString}</td>
                                        <td className="px-6 border  text-center">{toString}</td>
                                        <td className="px-6 border hidden lg:table-cell text-center">{nome}</td>
                                        <td className="px-6 border hidden lg:table-cell">{email}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}