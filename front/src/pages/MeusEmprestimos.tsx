import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { AuthContext } from "../Router";
import { VerifyAuth } from "../services/VerifyAuth";
import Swal from "sweetalert2";
import { emptyReservation, Reservation } from "../types/Reservation";
import { api } from "../services/api";

export function MeusEmprestimos() {
    const [load, setLoad] = useState(true)

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const bearer = "Bearer " + localStorage.getItem("token");

    const [reservation, setReservation] = useState<Reservation>(emptyReservation);

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
    }, [load])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        api.post("reservation",
            {
                to: reservation.to,
                from: reservation.from,
                book_id: reservation.book_id
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

    function handleRenewal(id: number) {
        const date = new Date()
        date.setDate(date.getDate() + 7)

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
                    })
                    .then(() => {
                        setLoad(state => !state)
                    })
                    .catch(e => console.log(e))
            }
        })

    }

    return (
        <div className={"bg-ligth-background_secondary min-h-screen pb-20"}>
            <NavBar />

            <div className="flex flex-col items-center pt-7 ">
                <div className={"bg-ligth-background_secondary w-full h-full"}>
                    <div className={` w-full flex justify-center `}>
                        <div className={`
                            bg-ligth-background text-ligth-primary 
                            pt-4 pb-4 pl-16 pr-16
                            rounded-xl   
                            h-max
                            w-4/5 max-w-md
                        `}>
                            <h1 className={"text-center mb-3 font-bold text-xl md:text-4xl"}>Reservar</h1>
                            <form onSubmit={handleSubmit} >
                                <div className={`flex flex-col mb-1`}>
                                    <label htmlFor={"titulo"}> ID do livro</label>
                                    <input type="number" required id={"titulo"} className={"rounded-lg text-ligth-secondary pl-1"}
                                        onChange={(e) =>
                                            setReservation(state => ({ ...state, book_id: e.target.value }))}
                                    />
                                </div>

                                <div className={"md:grid md:grid-cols-2 md:grid-rows-1 md:gap-x-5 mb-6"}>
                                    <div className={`flex flex-col mb-1`}>
                                        <label htmlFor={"data_inicio"}>Data de início</label>
                                        <input type="date" required id={"data_inicio"} className="rounded-lg text-ligth-secondary pl-1"
                                            onChange={(e) =>
                                                setReservation(state => ({ ...state, from: e.target.value }))}
                                        />
                                    </div>
                                    <div className={`flex flex-col mb-1`}>
                                        <label htmlFor={"data_fim"}>Data de término</label>
                                        <input type="date" required id={"data_fim"} className={"rounded-lg text-ligth-secondary pl-1"}
                                            onChange={(e) =>
                                                setReservation(state => ({ ...state, to: e.target.value }))}
                                        />
                                    </div>
                                </div>


                                <div className={"flex justify-center"}>
                                    <button type={"submit"} className={"bg-ligth-container p-2 rounded-full"}>
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="w-3/5 bg-white mt-9 text-ligth-button h-min p-10 drop-shadow-lg ">
                    <h1 className="ml-4 mt-1 mb-10 font-bold text-center text-xl">Livros emprestados</h1>

                    <div className="flex gap-4">
                        <div className="w-max rounded overflow-hidden shadow-lg bg-white relative group">
                            <img className="w-full" src="https://via.placeholder.com/150" alt="Capa do Livro" />

                            <div className="px-3 py-2">
                                <div className="font-bold text-xl mb-2">Título do Livro</div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Renovar</button>
                            </div>
                        </div>

                        <div className="w-max rounded overflow-hidden shadow-lg bg-white relative group">
                            <img className="w-full" src="https://via.placeholder.com/150" alt="Capa do Livro" />

                            <div className="px-3 py-2">
                                <div className="font-bold text-xl mb-2">Título do Livro</div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Renovar</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="flex flex-col items-center pt-7 ">

                <div className={`h-min w-min mt-5 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                        Livros pendentes para ser emprestado
                    </div>

                    <table className={"relative overflow-x-auto pr-2 mt-15"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-6 py-3 hidden lg:table-cell">Titulo</th>
                                <th className="px-6 py-3 hidden lg:table-cell max-sm:hidden">ISBN</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de emprestimo</th>
                                <th className="px-6 py-3 max-sm:text-xs">Data de devolução</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Usuário</th>
                                <th className="px-6 py-3 hidden lg:table-cell">E-mail</th>
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
                                                <td className="px-6 max-sm:px-0 hidden lg:table-cell max-sm:py-0 border max-sm:text-xs break-words">{MOCKADO}</td>
                                                <td className="px-6 border hidden lg:table-cell max-sm:hidden break-words">{MOCKADO}</td>
                                                <td className="px-6 border max-sm:text-xs break-words">{reservation.from}</td>
                                                <td className="px-6 border max-sm:text-xs text-center break-words">{reservation.to}</td>
                                                <td className="px-6 border hidden lg:table-cell text-center break-words">{MOCKADO}</td>
                                                <td className="px-6 border hidden lg:table-cell break-words">{MOCKADO}</td>
                                            </tr>
                                        )
                                    })) :
                                (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-3 text-center">Nenhuma reserva pendente</td>
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