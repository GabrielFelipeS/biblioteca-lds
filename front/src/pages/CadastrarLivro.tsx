import {NavBar} from "../components/NavBar";
import input_file from "../assets/file-input.png"
import {useState} from "react";
import {Livro, LivroEmpty} from "../Livro.ts";

export function CadastrarLivro() {
    const [livro, setLivro] = useState<Livro>(LivroEmpty)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar/>

            <div className={`h-min w-full flex justify-center pt-14`}>
                <input value={livro?.title} onChange={(e) => setLivro(state => ({
                    ...state,
                    title: e.target.value
                }))}/>

                <div className={`
                    bg-ligth-background text-ligth-primary 
                    pt-4 pb-4 pl-16 pr-16
                    rounded-xl   
                    h-max
                    w-3/5 md:w-2/5
                `}>
                    <h1 className={"text-center mb-3 font-bold text-xl md:text-4xl"}>Cadastrar livro</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={`flex flex-col mb-1`}>
                            <label htmlFor={"titulo"}> Titulo</label>
                            <input id={"titulo"}/>
                        </div>
                        <div className={`flex flex-col mb-1`}>
                            <label htmlFor={"autor"}> Autor</label>
                            <input id={"autor"}/>
                        </div>
                        <div className={`flex flex-col mb-1`}>
                            <label htmlFor={"genero"}> Genero</label>
                            <input id={"genero"}/>
                        </div>

                        <div className={"md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-5 mb-6"}>
                            <div className={`flex flex-col mb-1`}>
                                <label htmlFor={"isbn"}> Códgio ISBN</label>
                                <input id={"isbn"}/>
                            </div>
                            <div className={`flex flex-col mb-1`}>
                                <label htmlFor={"lancamento"}> Ano de lançamento</label>
                                <input id={"lancamento"}/>
                            </div>
                            <div className={`flex flex-col mb-1`}>
                                <label htmlFor={"editora"}> Editora</label>
                                <input id={"editora"}/>
                            </div>
                            <div className={`flex flex-col mb-1`}>
                                <label htmlFor={"edicao"}> Edição</label>
                                <input id={"edicao"}/>
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

                        <input id={"input-file"} type={"file"} className={"hidden"}/>

                        <div className={"flex justify-center"}>
                            <button type={"submit"} className={"bg-ligth-container p-2 rounded-full"}>
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}