import { createContext, useEffect, useState } from "react";
import { api } from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User.ts";


interface AuthContextType {
    role: string
    setRole:  React.Dispatch<React.SetStateAction<string>>
    isAdmin: boolean
    notIsLoggedIn: boolean
    isLoggedIn: boolean
    user: User
    setUser:  React.Dispatch<React.SetStateAction<User>>
}

export const AuthContext = createContext<AuthContextType>({ role: "visitor", setRole: () => {}, user: {name: "", email: ""}, setUser: () => {} ,isAdmin: false, notIsLoggedIn: true, isLoggedIn: false });

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const navigate = useNavigate()
    const [role, setRole] = useState<string>("visitor")
    const bearer = "Bearer " + localStorage.getItem("token");
    const isAdmin: boolean = role.includes("bibliotecario")
    const notIsLoggedIn: boolean = role.includes("visitor")
    const isLoggedIn: boolean = !notIsLoggedIn
    const [user, setUser]= useState<User>({name: "", email: ""})

    useEffect(() => {
        api
            .get("auth/validate",
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: bearer
                    }
                })
            .then(response => response.data.type)
            .then(type => {
                console.log(type)
                setRole(type)
            })
            .catch(e => {
                localStorage.clear()
                console.log(e)
                navigate("/login")
            })
    }, [])

    return (
        <AuthContext.Provider value={{ role, setRole, user, setUser, isAdmin, isLoggedIn, notIsLoggedIn }}>
            {children}
       </AuthContext.Provider>
    )
}