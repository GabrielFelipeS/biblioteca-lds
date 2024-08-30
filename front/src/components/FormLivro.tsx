import { ChangeEvent } from "react";
import {Book} from "../types/Book.ts";
import input_file from "/src/assets/file-input.png";

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
            setLivro(state => ({...state, image: file}))
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
                    <input id={"titulo"} value={livro.title} className={"rounded-lg text-ligth-secondary"}
                           onChange={(e) =>
                               setLivro(state => ({...state, title: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"autor"}> Autor</label>
                    <input id={"autor"} value={livro.author}
                           onChange={(e) =>
                               setLivro(state => ({...state, author: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"genero"}> Genero</label>
                    <input id={"genero"} value={livro.genre}
                           onChange={(e) =>
                               setLivro(state => ({...state, genre: e.target.value}))}
                    />
                </div>

                <div className={"md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-5 mb-6"}>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"isbn"}> Códgio ISBN</label>
                        <input id={"isbn"} value={livro.isbn} className="rounded-lg text-ligth-secondary"
                               onChange={(e) =>
                                   setLivro(state => ({...state, isbn: e.target.value}))}
                        />
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"lancamento"}> Ano de lançamento</label>
                        <input id={"lancamento"} value={livro.year}
                               onChange={(e) =>
                                   setLivro(state => ({...state, year: Number.parseInt(e.target.value)}))}/>

                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"editora"}> Editora</label>
                        <input id={"editora"} value={livro.edition}
                            onChange={(e) =>
                            setLivro(state => ({...state, publisher: e.target.value}))}
                        />
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"edicao"}> Edição</label>
                        <input id={"edicao"} value={livro.publisher}
                                   onChange={(e) =>
                                    setLivro(state => ({...state, edition: e.target.value}))}
                        />
                    </div>
                </div>

                Capa:
                <label htmlFor={"input-file"}
                       className={`flex justify-center bg-ligth-button rounded-full 
                                  pt-2 pb-2 mb-6`}
                >

                    <div className={" justify-center mr-6 ml-7 hidden md:flex"}>
                        Fazer upload
                    </div>
                    <img src={input_file} className={"h-5 w-4"} alt={"input file"}/>
                </label>

                <input id={"input-file"} type={"file"} className={"hidden"}
                    onChange={handleImage}
                />

                <div className={"flex justify-center"}>
                    <button type={"submit"} className={"bg-ligth-container p-2 rounded-full"}>
                        {buttonLabel}
                    </button>
                </div>
            </form>
        </div>
    )
}