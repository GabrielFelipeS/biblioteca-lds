import { Erro } from "../types/Erro"

interface ErrorsProps {
    errors: Erro[]
}

export function GenerateNewError(message: string) {
    const errorId = new Date().getTime();  // Cria um ID único para o erro
    const newError = { id: errorId, message: message};
    
    return newError;
}

export function Errors({errors}: ErrorsProps) {
    return (
        <div className="mt-4 space-y-2">
        {errors.map((error) => (  // Renderiza cada erro da lista
        <div key={error.id} className="p-4 bg-red-500 text-white rounded">
            {error.message}
        </div>
        ))}
    </div>
    )
} 