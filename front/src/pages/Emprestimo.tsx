import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { api } from "../services/api";
import { Book } from "../Book";


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

    return (
        <div className={"bg-ligth-background_secondary pb-20"}>
        <NavBar />
        <div className="flex justify-center pt-14 ">
            <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                    Acervos de Livros 
                </div>
                <table className={"relative overflow-x-auto"}>
                    <thead>
                        <tr className="text-ligth-primary bg-black">
                            <th className="px-9 py-3 "></th>
                            <th className="px-9 py-3"></th>
                            <th className="px-6 py-3 border">Titulo</th>
                            <th className="px-6 py-3 border">Autor</th>
                            <th className="px-6 py-3 border hidden lg:table-cell">Gênero</th>
                            <th className="px-6 py-3 border hidden lg:table-cell">ISBN</th>
                            <th className="px-6 py-3 border hidden lg:table-cell">Lançamento</th>
                            <th className="px-6 py-3 border hidden lg:table-cell">Editora</th>
                            <th className="px-6 py-3 border hidden lg:table-cell">Edição</th>
                            <th className="px-6 py-3 border">Unidades</th>
                        </tr>
                    </thead>
                    <tbody>
                       { books && books.map((book, index) => {
                            return (
                                <tr className="h-12" key={index}> 
                                    <td className="px-2 cursor-pointer border">
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg">Renovação</div>
                                    </td>
                                    <td className="px-2 cursor-pointer border">
                                        <div className="bg-ligth-tertiary text-ligth-primary p-1 rounded-lg">Devolução </div>
                                    </td>
                                    <td className="px-6 border">{book.title}</td>
                                    <td className="px-6 border">{book.author}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.genre}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.isbn}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.year}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.publisher}</td>
                                    <td className="px-6 border hidden lg:table-cell">{book.edition}</td>
                                    <td className="px-6 border">5/10</td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>
    );
}