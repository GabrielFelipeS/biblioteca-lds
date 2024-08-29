import { NavBar } from "../components/NavBar.tsx";
import verImg from "../assets/ver.png"
import editarImg from "../assets/editar.png"
import deletarImg from "/src/assets/deletar.png"
import { Book } from "../types/Book.ts";
import { useEffect, useState } from "react";
import { api } from "../services/api.ts"

export function Acervo() {
    const [books, setBooks] = useState<Book[] | null>();
    const bearer = "Bearer " + localStorage.getItem("token");

    useEffect(() => {
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
    }, [])

    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full pb-20"}>
            <NavBar />
            <div className="flex justify-center pt-14 ">
                <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                        Acervo de Livros 
                        
                    </div>
                    <table className={"relative overflow-x-auto"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-9 py-3 max-sm:px-0  max-sm:py-0"></th>
                                <th className="px-6 py-3 max-sm:px-0  max-sm:py-0">Titulo</th>
                                <th className="px-6 py-3 max-sm:hidden">Autor</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Gênero</th>
                                <th className="px-6 py-3 hidden lg:table-cell">ISBN</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Lançamento</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Editora</th>
                                <th className="px-6 py-3 hidden lg:table-cell">Edição</th>
                                <th className="px-6 py-3 max-sm:px-0 max-sm:py-0">Unidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books && books.map((book, index) => {
                                return (
                                    <tr className="h-12" key={index}>
                                         <td className="px-2 cursor-pointer border max-sm:px-0  max-sm:py-0">
                                         <div className="bg-ligth-blue p-1 rounded-lg"><img src={verImg} alt="Icone de visualização" className="w-4 h-3 flex m-auto" /></div>
                                        </td>
                                        <td className="px-2 cursor-pointer border">
                                            <div className="bg-ligth-orange p-1 rounded-lg"> <img src={editarImg} alt="Icone de editar" className="w-4 h-3 m-auto" /> </div>
                                        </td>
                                        <td className="px-2 cursor-pointer border">
                                            <div className="bg-ligth-red p-1 rounded-lg"><img src={deletarImg} alt="Icone de deletar" className="w-4 h-3 m-auto" /> </div>
                                        </td>
                                        <td className="px-6  max-sm:px-0  max-sm:py-0 border max-sm:text-xs">{book.title}</td>
                                        <td className="px-6 border max-sm:hidden">{book.author}</td>
                                        <td className="px-6 border hidden lg:table-cell">{book.genre}</td>
                                        <td className="px-6 border hidden lg:table-cell text-center">{book.isbn}</td>
                                        <td className="px-6 border hidden lg:table-cell text-center">{book.year}</td>
                                        <td className="px-6 border hidden lg:table-cell">{book.publisher}</td>
                                        <td className="px-6 border hidden lg:table-cell text-center">{book.edition}</td>
                                        <td className="px-6 max-sm:px-0  max-sm:py-0 max-sm:text-xs border text-center">5/10</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}