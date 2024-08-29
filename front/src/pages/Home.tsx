import { NavBar } from "../components/NavBar.tsx";

export function Home() {
    return (
        <div className={"bg-ligth-background_secondary pb-20 h-full w-full"}>
            <NavBar />
            <div className="flex justify-center pt-14">
                <div className={`h-full w-full flex flex-col justify-center items-center`}>
                    <div className="flex justify-center p-1 rounded-full w-2/6 border-ligth-tertiary border border-solid focus-within:border-2">

                        <label htmlFor="barra_pesquisa" className="w-min mr-2">
                            icon</label>
                        <input id="barra_pesquisa" placeholder="Digite o nome do livro, autor ou ISBN que deseja buscar." className="w-full bg-inherit outline-none" />
                    </div>
                    <div className="w-2/5 bg-white mt-9 text-ligth-button h-40 drop-shadow-lg">
                        <p className="ml-4 mt-1">Livros adicionados recenemente</p>
                    </div>

                    <div className="w-2/5 bg-white mt-9 text-ligth-button h-40 drop-shadow-lg">
                        <p className="ml-4 mt-1">Livros vistos recenemente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}