import { useState } from "react";
import { api } from "../services/api";
import { emptyReservation, Reservation } from "../types/Reservation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function Reservar() {
    const [reservation, setReservation] = useState<Reservation>(emptyReservation);
    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate()

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
                Swal.fire({
                    title: "Pedido enviado!",
                    text: "Pedido de reserva enviado com sucesso.",
                    icon: "success"
                }).then( () => {
                    navigate("user/emprestimo")
                })
            })
            .catch(e => console.log(e))
    }

    return (
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
    )
}