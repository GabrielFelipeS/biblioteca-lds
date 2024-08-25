import {NavigateFunction} from "react-router-dom";

interface ListItemProps {
    children: React.ReactNode;
    endPoint: string;
    navigate: NavigateFunction
}

export const style = (condition: boolean | null) =>
    (`cursor-pointer hover:bg-ligth-selected text-ligth-primary 
      font-bold h-full flex items-center pl-2 pr-2
      ${condition ? 'bg-ligth-selected' : ''} 
    `)

export const LiNavBar = ({children, endPoint, navigate}: ListItemProps ) => {
    const currentEndpoint = window.location.pathname;
    const condition = endPoint.includes(currentEndpoint);

    return (
        <li onClick={() => navigate(endPoint)}
            className={style(condition)}
        >
            {children}
        </li>
    )
}