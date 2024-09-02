import { useCallback, useEffect, useState } from "react";
import lupa from "../assets/lupa.png";
import { api } from "../services/api";
import { Book } from "../types/Book";
import {debounce} from 'lodash';

interface SearchProps {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

export function Search({ setBooks }: SearchProps) {
    const [search, setSearch] = useState<string>('');
    const bearer = "Bearer " + localStorage.getItem("token");
    

    const fetchBooks  = useCallback(
        debounce(async (query: string) => {
            api.get(`books/search/${query}`,
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
        }, 750), // 500ms de atraso
        []
      );

    useEffect(() => {
      if(search) {
        fetchBooks(search);
      }
    }, [search])


    return (
        <>
            <label htmlFor="barra_pesquisa" className="mr-2 flex items-center">
                <img src={lupa} alt="aqui" className="w-4 h-4" />
            </label>
            <input id="barra_pesquisa" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite o nome do livro, autor ou ISBN que deseja buscar." 
                className="w-full bg-inherit outline-none" />
        </>
    )
}