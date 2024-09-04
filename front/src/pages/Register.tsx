import { useContext, useState } from "react";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import { BackArrow } from "../components/BackArrow.tsx";
import { VerifyAuth } from "../services/VerifyAuth";
import { AuthContext } from "../components/AuthProvider.tsx";
import { Erro } from "../types/Erro.ts";
import { Errors } from "../components/Errors.tsx";

export function Register() {
    const navigate = useNavigate()
    // TODO juntar name e sobrenome ou separar no BACK nome completo por esses
    const [name, setNome] = useState<string>("")
    const [sobrenome, setSobrenome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telefone, setTelefone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password_confirmation, setPasswordConfirmation] = useState<string>("")

    const { notIsLoggedIn } = useContext(AuthContext)
    const [errors, setErrors] = useState<Erro[]>([]);
    VerifyAuth(notIsLoggedIn);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            name: name.trim() + " " + sobrenome.trim(),
            email,
            telefone,
            password,
            password_confirmation
        }

        api.post("auth/register", data)
            .then(() => navigate("/login"))
            .catch(e => {
                const erros = e.response?.data?.errors;
                console.log(erros)
                if(erros[0].password) {
                    setErrors([])
                }
            })
    }
    return (
        <div className={"flex w-screen h-screen bg-ligth-background"}>
            <BackArrow />
            <Errors errors={errors} />
            <div className="hidden w-1/2 md:flex justify-center items-end">
                <div className="text-4xl font-bold text-ligth-secondary w-[287px] h-[51px] mb-[199px]">
                    Bibliotex
                </div>
            </div>
            <div className="bg-ligth-container max-md:w-full w-1/2 flex flex-col justify-center items-center">
                <div className="text-ligth-primary font-bold text-5xl mb-5 flex justify-center">
                    Cadastro
                </div>
                <form onSubmit={handleSubmit} className="grid grid-rows-4 grid-cols-2 gap-x-10 justify-center w-10/12">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="nome" className="text-ligth-primary font-bold mb-1">
                            Nome:
                        </label>
                        <input name="nome" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setNome(e.target.value)} required />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="sobrenome" className="text-ligth-primary font-bold mb-1">
                            Sobrenome:
                        </label>
                        <input name="sobrenome" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setSobrenome(e.target.value)} required />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="text-ligth-primary font-bold mb-1">
                            E-mail:
                        </label>
                        <input type="email" name="email" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="telefone" className="text-ligth-primary font-bold mb-1">
                            Telefone:
                        </label>
                        <input name="telefone" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setTelefone(e.target.value)} required />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-ligth-primary font-bold mb-1">
                            Senha:
                        </label>
                        <input type="password" name="password" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password_confirm" className="text-ligth-primary font-bold mb-1">
                            Confirmar senha:
                        </label>
                        <input type="password" name="password_confirm" className="h-10 rounded-2xl"
                            onChange={
                                (e) => setPasswordConfirmation(e.target.value)} required />
                    </div>

                    <div className="flex justify-center col-span-2 mt-16">
                        <button type="submit"
                            className="flex bg-ligth-primary justify-center items-center font-bold text-ligth-tertiary rounded-full w-28 h-9">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
