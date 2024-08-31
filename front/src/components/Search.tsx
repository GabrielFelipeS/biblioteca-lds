import { useState } from "react"
import lupa from "../assets/lupa.png"
import { Book } from "../types/Book"

interface SearchProps {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

export function Search({ setBooks }: SearchProps) {
    const [search, setSearch] = useState<string>();

    return (
        <>
            <label htmlFor="barra_pesquisa" className="mr-2 flex items-center">
                <img src={lupa} alt="aqui" className="w-4 h-4" />
            </label>
            <input id="barra_pesquisa" placeholder="Digite o nome do livro, autor ou ISBN que deseja buscar." className="w-full bg-inherit outline-none" />
        </>
    )
}