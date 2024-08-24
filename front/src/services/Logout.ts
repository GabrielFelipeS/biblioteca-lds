import {api} from "./api.ts";
import {NavigateFunction} from "react-router-dom";

export function logout(navigate: NavigateFunction) {
    const bearer = "Bearer " + localStorage.getItem("token");

    api.post("auth/logout",
        {},
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: bearer
            }
        }).then((response) => {
        if(response.status == 200) {
            localStorage.clear()
            console.log(response.data)
            navigate("/home")
        }
    }).catch(e => console.log(e))

}