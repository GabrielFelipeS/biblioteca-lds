import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard.tsx";
import { NavBar } from "../components/NavBar.tsx";
import { Search } from "../components/Search.tsx";
import { api } from "../services/api.ts";
import { Book } from "../types/Book.ts";
import { DefaultPagination, PaginationType } from "../types/Pagination.ts";

export function Home() {
    const [books, setBooks] = useState<Book[]>([])
    const [pagination, setPagination] = useState<PaginationType>(DefaultPagination)
    const bearer = "Bearer " + localStorage.getItem("token");
    const navigate = useNavigate();

    function desconstrutorPagination({ current_page, first_page_url, from, last_page,
        last_page_url, links, next_page_url, path, per_page, prev_page_url, to, total }: PaginationType) {
        return {
            current_page, first_page_url, from, last_page, last_page_url, links, next_page_url,
            path, per_page, prev_page_url, to, total
        }
    }

    function itNoAnEmptyPageAndTheFirstPage(data: any) {
        const books: Book[] = data.data
        const pagination = desconstrutorPagination(data)
        return books.length != 0 && pagination.current_page !== "1"
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
                if (itNoAnEmptyPageAndTheFirstPage(response.data)) {
                    setBooks(response.data.data)
                    setPagination(desconstrutorPagination(response.data))
                } else {
                    setPagination(state => ({ ...state, current_page: "1" }))
                }
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div className={"bg-ligth-background_secondary pb-20 min-h-screen w-full"}>
            <NavBar />

            <div className="flex justify-center pt-14">
                <div className={`h-full w-full flex flex-col justify-center items-center`}>
                    <div className="flex justify-center p-1 rounded-full w-2/6 border-ligth-tertiary border border-solid focus-within:border-2">

                        <Search setBooks={setBooks} />

                    </div>
                    <div className="w-11/12 h-min pl-10 pt-10 bg-white mt-9 pb-10 text-ligth-button  drop-shadow-lg">
                        <p className="ml-4 mt-1">Livros adicionados recenemente</p>
                        <div className="flex flex-wrap gap-2 justify-evenly pb-5">
                            {books &&
                                books
                                    .map((book, index) => (
                                        <BookCard
                                            key={index}
                                            book_id={book.id.toString()}
                                            buttonText={"Reservar"}
                                            handle={() => console.log("a")}
                                        />
                                    ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}