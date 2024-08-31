import { ChangeEvent } from "react";
import {Book} from "../types/Book.ts";
import { UploadFile } from "./UploadFile.tsx";


interface FormLivroProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    livro: Book
    setLivro: React.Dispatch<React.SetStateAction<Book>>
    title: string
    buttonLabel: string
}

export function FormLivro({handleSubmit, livro, setLivro,
                              title, buttonLabel}: FormLivroProps) {
    function handleImage (event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log(file)
            setLivro(state => ({...state, file: file}))
        }
    }

    return (
        <div className={`
                    bg-ligth-background text-ligth-primary 
                    pt-4 pb-4 pl-16 pr-16
                    rounded-xl   
                    h-max
                    w-4/5 max-w-md
                `}>
            <h1 className={"text-center mb-3 font-bold text-xl md:text-4xl"}>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"titulo"}> Titulo</label>
                    <input required id={"titulo"} value={livro.title} className={"rounded-lg text-ligth-secondary pl-1"}
                           onChange={(e) =>
                               setLivro(state => ({...state, title: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"autor"}> Autor</label>
                    <input required id={"autor"} value={livro.author} className={"rounded-lg text-ligth-secondary pl-1"}
                           onChange={(e) =>
                               setLivro(state => ({...state, author: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"genero"}> Genero</label>
                    <input required id={"genero"} value={livro.genre} className={"rounded-lg text-ligth-secondary pl-1"}
                           onChange={(e) =>
                               setLivro(state => ({...state, genre: e.target.value}))}
                    />
                </div>

                <div className={"md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-5 mb-6"}>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"isbn"}> Códgio ISBN</label>
                        <input required id={"isbn"} value={livro.isbn} className="rounded-lg text-ligth-secondary pl-1"
                               onChange={(e) =>
                                   setLivro(state => ({...state, isbn: e.target.value}))}
                        />
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"lancamento"}> Ano de lançamento</label>
                        <input required id={"lancamento"} value={livro.year} className={"rounded-lg text-ligth-secondary pl-1"}
                               onChange={(e) =>
                                   setLivro(state => ({...state, year: e.target.value}))}/>

                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"editora"}> Editora</label>
                        <input required id={"editora"} value={livro.edition} className={"rounded-lg text-ligth-secondary pl-1"}
                            onChange={(e) =>
                            setLivro(state => ({...state, edition: e.target.value}))}
                        />
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"edicao"}> Edição</label>
                        <input required id={"edicao"} value={livro.publisher} className={"rounded-lg text-ligth-secondary pl-1"}
                                   onChange={(e) =>
                                    setLivro(state => ({...state, publisher: e.target.value}))}
                        />
                    </div>
                </div>

                Capa:
                <UploadFile book={livro} handleImage={handleImage}/>

                <div className={"flex justify-center"}>
                    <button type={"submit"} className={"bg-ligth-container p-2 rounded-full"}>
                        {buttonLabel}
                    </button>
                </div>
            </form>
        </div>
    )
}