import { NavBar } from "../components/NavBar.tsx";

export function Acervo() {
    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar />
            <div className="flex justify-center pt-14">
                <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                        Acervos de Livros
                    </div>
                    <table className={"table-fixed"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black w-full">
                                <th className="pr-8"></th>
                                <th className="pr-8"></th>
                                <th className="pr-8"></th>
                                <th className="pr-8">Titulo</th>
                                <th className="pr-8">Autor</th>
                                <th className="pr-8">Gênero</th>
                                <th className="pr-8">ISBN</th>
                                <th className="pr-8">Lançamento</th>
                                <th className="pr-8">Editora</th>
                                <th className="pr-8">Edição</th>
                                <th>Unidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Exemplo</td>
                                <td>Autor</td>
                                <td>Gênero</td>
                                <td>ISBN</td>
                                <td>Lançamento</td>
                                <td>Editora</td>
                                <td>Edição</td>
                                <td>5/10</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Exemplo</td>
                                <td>Autor</td>
                                <td>Gênero</td>
                                <td>ISBN</td>
                                <td>Lançamento</td>
                                <td>Editora</td>
                                <td>Edição</td>
                                <td>5/10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}