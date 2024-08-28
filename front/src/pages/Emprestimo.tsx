import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { api } from "../services/api";
import { Book } from "../Book";


export function Emprestimo() {
    const [books, setBooks] = useState<Book[] | null>();
    const bearer = "Bearer " + localStorage.getItem("token");
    api.get("books",
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: bearer
            }
        })
        .then(response => {
            console.log(response)
            setBooks(response.data)
        })
        .catch(e => console.log(e))

    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
        <NavBar />
        <div className="flex justify-center pt-14 ">
            <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                    Acervos de Livros 
                </div>
                <table className={"relative overflow-x-auto"}>
                    <thead>
                        <tr className="text-ligth-primary bg-black">
                            <th className="px-9 py-3"></th>
                            <th className="px-9 py-3"></th>
                            <th className="px-6 py-3">Titulo</th>
                            <th className="px-6 py-3">Autor</th>
                            <th className="px-6 py-3">Gênero</th>
                            <th className="px-6 py-3">ISBN</th>
                            <th className="px-6 py-3">Lançamento</th>
                            <th className="px-6 py-3">Editora</th>
                            <th className="px-6 py-3">Edição</th>
                            <th className="px-6 py-3">Unidades</th>
                        </tr>
                    </thead>
                    <tbody>
                       { books && books.map(book => {
                            return (
                                <tr className="h-12"> 
                                    <td className="px-2 cursor-pointer">
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg">Renovação</div>
                                    </td>
                                    <td className="px-2 cursor-pointer">
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg">Devolução </div>
                                    </td>
                                    <td className="px-6">Exemplo</td>
                                    <td className="px-6">Autor</td>
                                    <td className="px-6">Gênero</td>
                                    <td className="px-6">ISBN</td>
                                    <td className="px-6">Lançamento</td>
                                    <td className="px-6">Editora</td>
                                    <td className="px-6">Edição</td>
                                    <td className="px-6">5/10</td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>
    );
}