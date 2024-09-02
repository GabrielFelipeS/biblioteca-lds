import { useNavigate } from "react-router-dom";
import back_arrow from "../assets/arrow_back.png"

export function BackArrow() {
    const navigate = useNavigate()

    function handleClick() {
        navigate(-1)
    }

    return (
        <>
            <img src={back_arrow} alt="" className="absolute top-100 left-2 h-12 w-12 cursor-pointer" onClick={handleClick}/>
        </>
    );
}