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
<<<<<<< HEAD
                    <input id={"autor"} value={livro.author}
=======
                    <input id={"autor"} value={livro.autor} className="rounded-lg text-ligth-secondary"
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e
                           onChange={(e) =>
                               setLivro(state => ({...state, author: e.target.value}))}
                    />
                </div>
                <div className={`flex flex-col mb-1`}>
                    <label htmlFor={"genero"}> Genero</label>
<<<<<<< HEAD
                    <input id={"genero"} value={livro.genre}
=======
                    <input id={"genero"} value={livro.genero} className="rounded-lg text-ligth-secondary"
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e
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
<<<<<<< HEAD
                        <input id={"lancamento"} value={livro.year}
                               onChange={(e) =>
                                   setLivro(state => ({...state, year: Number.parseInt(e.target.value)}))}/>
=======
                        <input type="number" id={"lancamento"} value={livro.ano} className="rounded-lg text-ligth-secondary"
                               onChange={(e) => {
                                const anoInput = Number.isInteger(e.target.value)? Number.parseInt(e.target.value) : 0;
                                   setLivro(state => ({...state, ano: Number.parseInt(e.target.value)}))}}/>
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e

                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"editora"}> Editora</label>
<<<<<<< HEAD
                        <input id={"editora"} value={livro.edition}
=======
                        <input id={"editora"} value={livro.editora} className="rounded-lg text-ligth-secondary"
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e
                               onChange={(e) =>
                                   setLivro(state => ({...state, edition: e.target.value}))}/>
                    </div>
                    <div className={`flex flex-col mb-1`}>
                        <label htmlFor={"edicao"}> Edição</label>
<<<<<<< HEAD
                        <input id={"edicao"} value={livro.publisher}
=======
                        <input id={"edicao"} value={livro.edicao} className="rounded-lg text-ligth-secondary"
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e
                               onChange={(e) =>
                                   setLivro(state => ({...state, publisher: e.target.value}))}
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