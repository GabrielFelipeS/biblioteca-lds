import { NavBar } from "../components/NavBar.tsx";
import verImg from "../assets/ver.png"
import editarImg from "../assets/editar.png"
import deletarImg from "/src/assets/deletar.png"
import { Book } from "../types/Book.ts";
import { useEffect, useState } from "react";
import { api } from "../services/api.ts"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { DefaultPagination, PaginationType } from "../types/Pagination.ts";


export function Acervo() {
    const [update, setUpdate] = useState(true);
    const [pagination, setPagination] = useState<PaginationType>(DefaultPagination)
    const [books, setBooks] = useState<Book[]>([]);
    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate();

    function desconstrutorPagination({current_page, first_page_url, from, last_page,
             last_page_url, links, next_page_url, path, per_page, prev_page_url, to ,total}: PaginationType) {
            return {
                current_page, first_page_url, from,last_page, last_page_url, links, next_page_url, 
                path, per_page, prev_page_url, to, total
            }

    } 

    useEffect(() => {
        api.get(`books?page=${pagination.current_page}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: bearer
                }
            })
            .then(response => {
                setBooks(response.data.data)
                setPagination( desconstrutorPagination(response.data))
                console.log(response.data)
            })
            .catch(e => console.log(e))
    }, [update])

    function editBook(id: number) {
        navigate(`/livro/editar/${id}`)
    }

    function deleteBook(title: string, id: number) {
        Swal.fire({
            title: "Você tem certeza?",
            text: `Deletando '${title}' Você não vai poder reverter o processo!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar o livro!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`books/${id}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(response => {
                        console.log(response)
                        if (response.status == 204) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Livro deletado com sucesso.",
                                icon: "success"
                            });
                            setLoad(state => !state);
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Alguma coisa deu errado!",
                            footer: `Erro: ${e.response.data.message}`
                        });
                    }
                    )
            }
        });
    }

    return (
        <div className={"bg-ligth-background_secondary min-h-screen pb-20"}>
            <NavBar />
            <div className="flex justify-center pt-14 ">
                <div className={`h-full w-11/12 pb-3 flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                        Acervo de Livros
                    </div>
                    <table className={"overflow-x-auto w-full md:table-fixed"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Titulo</th>
                                <th className="max-sm:hidden">Autor</th>
                                <th className="hidden lg:table-cell">Gênero</th>
                                <th className="hidden lg:table-cell">ISBN</th>
                                <th className="hidden xl:table-cell">Lançamento</th>
                                <th className="hidden xl:table-cell">Editora</th>
                                <th className="hidden xl:table-cell">Edição</th>
                                <th>Unidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books && Array.isArray(books) && books.map((book, index) => {
                                return (
                                    <tr className="" key={index}>
                                        <td className="cursor-pointer border max-sm:px-0  max-sm:py-0">
                                            <button className="bg-ligth-blue p-1 rounded-lg"><img src={verImg} alt="Icone de visualização" className="w-4 h-3 flex m-auto" /></button>
                                        </td>
                                        <td className="cursor-pointer border">
                                            <button onClick={() => editBook(book.id)} className="bg-ligth-orange p-1 rounded-lg"> <img src={editarImg} alt="Icone de editar" className="w-4 h-3 m-auto" /> </button>
                                        </td>
                                        <td className="cursor-pointer border">
                                            <button onClick={() => deleteBook(book.title, book.id)} className="bg-ligth-red p-1 rounded-lg"><img src={deletarImg} alt="Icone de deletar" className="w-4 h-3 m-auto" /> </button>
                                        </td>
                                        <td className="px-1 max-sm:px-0   border max-sm:text-xs">{book.title}</td>
                                        <td className="px-1 border max-sm:hidden">{book.author}</td>
                                        <td className="border hidden lg:table-cell">{book.genre}</td>
                                        <td className="border hidden lg:table-cell ai">{book.isbn}</td>
                                        <td className="border hidden xl:table-cell">{book.year}</td>
                                        <td className="border hidden xl:table-cell">{book.publisher}</td>
                                        <td className="border hidden xl:table-cell">{book.edition}</td>
                                        <td className="max-sm:text-xs border">5/10</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                    <Pagination pagination={pagination} setPagination={setPagination} setUpdate={setUpdate}/>
                </div>
            </div>
        </div>
    )
}