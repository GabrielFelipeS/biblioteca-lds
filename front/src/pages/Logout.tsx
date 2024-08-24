import {useEffect} from "react";
import {api} from "../services/api.ts";
import {useNavigate} from "react-router-dom";

export function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = "Bearer:" + localStorage.getItem("token");
        api.post("auth/logout", token)
            .then(response => {
                if(response.status == 200)
                    localStorage.removeItem("token")
            })
            .catch(e => {
                console.log(localStorage.getItem("token"))
                console.log(e)
            })

    }, [])

    return (
        <>
            Logout
        </>
    )
}