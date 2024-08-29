import { NavBar } from "../components/NavBar.tsx";
import verImg from "../assets/ver.png"
import editarImg from "../assets/editar.png"
import deletarImg from "/src/assets/deletar.png"

export function Acervo() {
    return (
        <div className={"bg-ligth-background_secondary h-screen md:h-full"}>
            <NavBar />
            <div className="flex justify-center pt-14 ">
                <div className={`h-min w-min flex flex-col justify-center items-center bg-white`}>
                    <div className="text-ligth-primary bg-black w-full flex justify-center py-3 font-bold text-2xl ">
                        Acervo de Livros 
                        
                    </div>
                    <table className={"relative overflow-x-auto"}>
                        <thead>
                            <tr className="text-ligth-primary bg-black">
                                <th className="px-9 py-3"></th>
                                <th className="px-9 py-3"></th>
                                <th className="px-9 py-3"></th>
                                <th className="px-6 py-3">Titulo</th>
                                <th className="px-6 py-3">Autor</th>
                                <th className="px-6 py-3">Gênero</th>
                                <th className="px-6 py-3">ISBN</th>
                                <th className="px-6 py-3">Lançamento</th>
                                <th className="px-6 py-3">Editora</th>
                                <th className="px-6 py-3">Edição</th>
                                <th className="px-6 py-3">Unidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-12"> 
                                <td className="px-2 cursor-pointer"><div className="bg-ligth-blue p-1 rounded-lg"><img src={verImg} alt="Icone de visualização" className="w-4 h-3 flex m-auto"/></div></td>
                                <td className="px-2 cursor-pointer"><div className="bg-ligth-orange p-1 rounded-lg"> <img src={editarImg} alt="Icone de editar" className="w-4 h-3 m-auto"/> </div></td>
                                <td className="px-2 cursor-pointer"><div className="bg-ligth-red p-1 rounded-lg"><img src={deletarImg} alt="Icone de deletar" className="w-4 h-3 m-auto"/> </div></td>
                                <td className="px-6">Exemplo</td>
                                <td className="px-6">Autor</td>
                                <td className="px-6">Gênero</td>
                                <td className="px-6">ISBN</td>
                                <td className="px-6">Lançamento</td>
                                <td className="px-6">Editora</td>
                                <td className="px-6">Edição</td>
                                <td className="px-6">5/10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            
        </div>
    )
}