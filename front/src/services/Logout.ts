import {NavigateFunction} from "react-router-dom";
// import axios from "axios";
import {api} from "./api.ts";

export function logout(navigate: NavigateFunction) {
    const bearer = "Bearer " + localStorage.getItem("token");

    console.log( localStorage.getItem("token"))

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
        ).then((response) => {
        if(response.status == 200) {
            localStorage.clear()
            navigate("/home")
        }
    }).catch(e => console.log(e))

}