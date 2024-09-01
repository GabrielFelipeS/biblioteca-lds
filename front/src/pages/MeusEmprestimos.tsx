import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Search } from "../components/Search";
import { Book } from "../types/Book";

export function MeusEmprestimos() {
    const [books, setBooks] = useState<Book[]>([])
    console.log(books.length)
    return (
        <div className={"bg-ligth-background_secondary pb-20 h-full w-full"}>
            <NavBar />

            <div className="flex justify-center pt-14">
                <div className={`h-full w-full flex flex-col justify-center items-center`}>
                    <div className="flex justify-center p-1 rounded-full w-2/6 border-ligth-tertiary border border-solid focus-within:border-2">

                        <Search setBooks={setBooks} />
                    </div>
                </div>
            </div>
        </div>
    )
}