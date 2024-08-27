import { ChangeEvent } from "react";
import {Book} from "../Book.ts";
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
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;

    function handleImage (event: ChangeEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
    
        if (file) {
          // Cria um URL para o arquivo selecionado
          const reader = new FileReader();
    
          reader.onload = (e) => {
            // Atualiza a fonte da imagem para o URL do arquivo
            imagePreview.src = e.target?.result as string;
            imagePreview.style.display = 'block';
          };
    
          reader.readAsDataURL(file);
        }
    }
    return (
        <div className={`
                    bg-ligth-background text-ligth-primary 
                    pt-4 pb-4 pl-16 pr-16
                    rounded-xl   
                    h-max
                    w-2/5 md:w-
                `}>
            <h1 className={"text-center mb-3 font-bold text-xl md:text-4xl"}>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"titulo"}> Titulo</label>
                    <input id={"titulo"} value={livro.title} className={""}
                           onChange={(e) =>
                               setLivro(state => ({...state, title: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"autor"}> Autor</label>
                    <input id={"autor"} value={livro.autor}
                           onChange={(e) =>
                               setLivro(state => ({...state, autor: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"genero"}> Genero</label>
                    <input id={"genero"} value={livro.genero}
                           onChange={(e) =>
                               setLivro(state => ({...state, genero: e.target.value}))}
                    />
                </div>

                <div className={"md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-5 mb-6"}>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"isbn"}> Códgio ISBN</label>
                        <input id={"isbn"} value={livro.isbn}
                               onChange={(e) =>
                                   setLivro(state => ({...state, isbn: e.target.value}))}
                        />
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"lancamento"}> Ano de lançamento</label>
                        <input id={"lancamento"} value={livro.ano}
                               onChange={(e) =>
                                   setLivro(state => ({...state, ano: Number.parseInt(e.target.value)}))}/>

                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"editora"}> Editora</label>
                        <input id={"editora"} value={livro.editora}
                               onChange={(e) =>
                                   setLivro(state => ({...state, editora: e.target.value}))}/>
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"edicao"}> Edição</label>
                        <input id={"edicao"} value={livro.edicao}
                               onChange={(e) =>
                                   setLivro(state => ({...state, edicao: e.target.value}))}
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