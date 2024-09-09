import { useContext, useState } from "react";
import { api } from "../services/api";
import { emptyReservation, Reservation } from "../types/Reservation";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Erro } from "../types/Erro";
import { Errors } from "../components/Errors";
import { AuthContext } from "../components/AuthProvider";

export function Reservar() {
    const { id } = useParams()
    const book_id = id ? id : "1"
    const {isAdmin} = useContext(AuthContext)
    const [reservation, setReservation] = useState<Reservation>({ ...emptyReservation, book_id: book_id });

    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate()

    const [errors, setErrors] = useState<Erro[]>([]); 

    console.log(reservation.from)

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
                }).then(() => {
                    if(isAdmin) {
                        navigate("emprestimo")
                    } else {
                        navigate("emprestimo")
                    }
                })
            })
            .catch(err => {
                const errorId = new Date().getTime();
                const newError = { id: errorId, message: err.response.data.message };
                setErrors([...errors, newError]);  

                setTimeout(() => {
                    setErrors((prevErrors) => prevErrors.filter(error => error.id !== errorId));
                }, 5000);
            })
    }

    return (
        <div className={"bg-ligth-background_secondary w-screen h-screen"}>
            <NavBar />
           <Errors errors={errors}/>

            <div className="mt-10 h-min w-full">

                <div className={` w-full flex justify-center `}>
                    <div className={`
                                bg-ligth-background text-ligth-primary 
                                pt-4 pb-4 pl-16 pr-16
                                rounded-xl   
                                md:h-max
                                w-4/5 max-w-md  
                            `}>
                        <h1 className={"text-center mb-3 font-bold text-xl md:text-4xl"}>Reservar</h1>
                        <form onSubmit={handleSubmit} >
                            <div className={`flex flex-col mb-1`}>
                                <label htmlFor={"titulo"}> ID do livro</label>
                                <input type="number" required id={"titulo"} className={"rounded-lg text-ligth-secondary pl-1"}
                                    value={reservation.book_id}
                                    onChange={(e) =>
                                        setReservation(state => ({ ...state, book_id: e.target.value }))}
                                />
                            </div>

                            <div className={"md:grid md:grid-cols-2 md:grid-rows-1 md:gap-x-5 mb-6"}>
                                <div className={`flex flex-col mb-1`}>
                                    <label htmlFor={"data_inicio"}>Data de início (from)</label>
                                    <input type="date" required id={"data_inicio"} className="rounded-lg text-ligth-secondary pl-1"
                                        value={reservation.from}
                                        onChange={(e) =>
                                            setReservation(state => ({ ...state, from: e.target.value }))}
                                    />
                                </div>
                                <div className={`flex flex-col mb-1`}>
                                    <label htmlFor={"data_fim"}>Data de término (to)</label>
                                    <input type="date" required id={"data_fim"} className={"rounded-lg text-ligth-secondary pl-1"}
                                        value={reservation.to}
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
        </div >
    )
}