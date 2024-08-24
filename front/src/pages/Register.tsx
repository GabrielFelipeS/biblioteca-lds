export function Register() {
    return (
        <div className={"flex w-full h-full bg-ligth-background"}>
            <div className="hidden w-1/2 md:flex justify-center items-end">
                <div className="text-4xl font-bold text-ligth-secondary w-[287px] h-[51px] mb-[199px]">
                    Bibliotex
                </div>
            </div>
            <div className="bg-ligth-container max-md:w-full w-1/2 flex flex-col justify-center items-center">
                <div className="text-ligth-primary font-bold text-5xl mb-5 flex justify-center">
                    Cadastro
                </div>
                <form className="grid grid-rows-4 grid-cols-2 gap-x-10 justify-center w-10/12">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="nome" className="text-ligth-primary font-bold mb-1">
                            Nome:
                        </label>
                        <input name="nome" className="h-10 rounded-2xl"/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="sobrenome" className="text-ligth-primary font-bold mb-1">
                            Sobrenome:
                        </label>
                        <input name="sobrenome" className="h-10 rounded-2xl"/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="text-ligth-primary font-bold mb-1">
                            E-mail:
                        </label>
                        <input name="email" className="h-10 rounded-2xl"/>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="telefone" className="text-ligth-primary font-bold mb-1">
                            Telefone:
                        </label>
                        <input name="telefone" className="h-10 rounded-2xl"/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-ligth-primary font-bold mb-1">
                            Senha:
                        </label>
                        <input name="password" className="h-10 rounded-2xl"/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password_confirm" className="text-ligth-primary font-bold mb-1">
                            Confirmar senha:
                        </label>
                        <input name="password_confirm" className="h-10 rounded-2xl"/>
                    </div>

                    <div className="flex justify-center col-span-2 mt-16">
                        <button type="submit"
                                className="flex bg-ligth-primary justify-center items-center font-bold text-ligth-tertiary rounded-full w-28 h-9">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}