import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { api } from "../services/api";
import { Book } from "../types/Book";


export function Emprestimo() {
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

    function handleRenewal(id: string) {
        console.log(id)
    }

    function handleReturn(id: string) {
        console.log(id)
    }

    return (
        <div className={"bg-ligth-background_secondary pb-20"}>
        <NavBar />
        <div className="flex justify-center pt-14 ">
            <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl max-sm:text-base ">
                    Acervos de Livros 
                </div>
                <table className={"relative overflow-x-auto pr-2"}>
                    <thead>
                        <tr className="text-ligth-primary bg-black">
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
                       { books && books.map((book, index) => {
                            return (
                                <tr className="h-12" key={index}> 
                                    <td className="px-2 cursor-pointer border max-sm:px-0  max-sm:py-0" onClick={() => handleRenewal(book.id)}>
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs" >Renovação</div>
                                    </td>
                                    <td className="px-2 cursor-pointer border" onClick={() => handleReturn(book.id)}>
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg max-sm:text-xs" >Devolução </div>
                                    </td>
                                    <td className="px-6  max-sm:px-0  max-sm:py-0 border max-sm:text-xs">{book.title}</td>
                                    <td className="px-6 border max-sm:hidden">{book.author}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.genre}</td>
                                    <td className="px-6 border hidden lg:table-cell text-center">{book.isbn}</td>
                                    <td className="px-6 border hidden lg:table-cell text-center">{book.year}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.publisher}</td>
                                    <td className="px-6 border hidden lg:table-cell text-center">{book.edition}</td>
                                    <td className="px-6 max-sm:px-0  max-sm:py-0 max-sm:text-xs border text-center">5/10</td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>
    );
}