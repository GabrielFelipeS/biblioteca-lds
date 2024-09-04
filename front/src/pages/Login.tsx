import {useContext, useState} from "react";
import {api} from "../services/api"
import {useNavigate} from "react-router-dom";
import { VerifyAuth } from "../services/VerifyAuth";
import { AuthContext } from "../components/AuthProvider";
import { User } from "../types/User";
import { Erro } from "../types/Erro";
import { Errors } from "../components/Errors";

export function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigete = useNavigate();

    const {notIsLoggedIn, setRole, setUser} = useContext(AuthContext)
    const [errors, setErrors] = useState<Erro[]>([]); 
    
    VerifyAuth(notIsLoggedIn);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = {
            email,
            password
        }

        api.post("auth/login", data)
            .then(response => {
                console.log(response.data)
                return response.data
            })
            .then(responseData =>  responseData.token)
            .then(responseToken => {
                api.get("auth/validate",
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization:  "Bearer " +  responseToken
                        }
                    })
                .then(response => {
                    console.log(response)
                    const user: User = response.data.user
                    setUser({name: user.name, email: user.email})
                    return response.data.type
                })
                .then(type => {
                    setRole(type)
                    localStorage.setItem("token", responseToken)
                    navigete("/home")
                }).catch(e => {
                    console.log(`aqui? ${e}`)
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
        <div className={"flex w-screen h-screen bg-ligth-background"}>
            <div className="hidden w-2/3 md:flex justify-center items-end" >
                <div className="text-4xl font-bold text-ligth-secondary w-[287px] h-[51px] mb-[199px]">
                    Bibliotex
                </div>
            </div>
            <div className="bg-ligth-container max-md:w-full w-1/3 flex justify-center items-center">
            <Errors errors={errors}/>
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
                    <div className="text-ligth-primary mb-7 font-bold cursor-pointer" onClick={() => navigete("/register")}>
                        Aperte aqui para registrar-se
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