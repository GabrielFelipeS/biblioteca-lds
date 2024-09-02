import {useNavigate} from "react-router-dom";
import { MenuNavBar } from "./MenuNavBar.tsx";

export function NavBar() {
    const navigate = useNavigate()
 
    return (
        <div className="flex justify-around items-center bg-ligth-background h-20">
            <div className="w-full ml-5 font-bold text-4xl hidden sm:flex cursor-pointer" onClick={() => navigate("/home")}>
                Bibliotex
            </div>

            <div className="w-full h-full">
               <ul id={"menu"} className="flex flex-row h-full justify-center sm:justify-start">
                    <MenuNavBar navigate={navigate}/>
               </ul>
            </div>
        </div>
    )
}