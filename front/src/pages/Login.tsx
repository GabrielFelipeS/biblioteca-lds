import {useEffect, useState} from "react";
import {api} from "../services/api"
import {useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigete = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token && token.trim().length != 0) {
            navigete("/home")
        }
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = {
            email,
            password
        }

        api.post("auth/login", data)
            .then(response => response.data)
            .then(responseData =>  responseData.token)
            .then(responseToken => {
                localStorage.setItem("token", responseToken)
                navigete("/home")
            })
            .catch(e => {
               console.log(e)
            })
    }


    return (
        <div className={"flex w-full h-full bg-ligth-background"}>
            <div className=" w-2/3 flex justify-center items-end" >
                <div className="text-4xl font-bold text-ligth-secondary w-[287px] h-[51px] mb-[199px]">
                    Bibliotex
                </div>
            </div>
            <div className="bg-ligth-container max-md:w-full w-1/3 flex justify-center items-center">
                <form className="flex flex-col justify-center w-56" onSubmit={handleSubmit}>
                    <div className="text-ligth-primary font-bold text-5xl mb-5 flex justify-center">
                            Login
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="text-ligth-primary font-bold mb-1">
                            E-mail:
                        </label>
                        <input type="email" name="email" className="h-10 rounded-2xl pl-1"
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-ligth-primary font-bold mb-1">
                            Senha:
                        </label>
                        <input type="password" name="password" className="h-10 rounded-2xl pl-1"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="text-ligth-primary mb-7 font-bold">
                        Esqueceu sua senha?
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="flex bg-ligth-primary justify-center items-center font-bold text-ligth-tertiary rounded-full w-28 h-9">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}