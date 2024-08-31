import { PaginationType } from "../types/Pagination"

interface PaginationProps {
    pagination: PaginationType
    setPagination: React.Dispatch<React.SetStateAction<PaginationType>>
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export function Pagination({ pagination, setPagination, setUpdate }: PaginationProps) {
    function handlePagination(url: String) {
        if(url) {
            const numberPage = url.split("page=")[1];
            console.log(numberPage)
            setPagination(state => ({...state, current_page: numberPage}))
            setUpdate(state => !state)
        }
    }

    return (
        <div className="w-full h-full mt-5 flex justify-center items-center gap-5">
            {pagination.links && pagination.links.map((link, index) => (
                <button
                    key={index}
                    onClick={() => handlePagination(link.url)}
                    className={`px-4 py-2 ${link.active ? 'bg-ligth-background text-white' : 'bg-gray-200 text-gray-700'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    )
}