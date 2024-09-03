import {NavigateFunction} from "react-router-dom";
// import axios from "axios";
import {api} from "./api.ts";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider.tsx";

export function logout(navigate: NavigateFunction) {
    const bearer = "Bearer " + localStorage.getItem("token");
 

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: bearer
        }
    }

    api.post("auth/logout",
        {},
        config
        )
    .catch(e => console.log(e))
    .finally(() => {
        localStorage.clear()
        navigate("/login")
    })

}