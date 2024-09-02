import { useNavigate } from "react-router-dom";


export function VerifyAuth(condition: boolean) {
    const navigate = useNavigate()

    const isConditionFalse = !condition;
    if(isConditionFalse) {
        navigate("/home")
    }
}