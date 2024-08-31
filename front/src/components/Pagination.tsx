import { PaginationType } from "../types/Pagination"

interface PaginationProps {
    pagination: PaginationType
    setPagination: React.Dispatch<React.SetStateAction<PaginationType>>
}

export function Pagination({ pagination, setPagination }: PaginationProps) {
    console.log(pagination)
    return (
        <div className="w-full h-full mt-5 flex justify-center items-center gap-5">
            {pagination.links && pagination.links.map((link, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    )
}