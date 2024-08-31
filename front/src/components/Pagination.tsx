import { PaginationType } from "../types/Pagination"

interface PaginationProps {
    pagination: PaginationType
    setPagination: React.Dispatch<React.SetStateAction<PaginationType>>
}

export function Pagination({pagination, setPagination}: PaginationProps) {
    console.log(pagination)
    return (
        <div className="mt-5 tr-">
                        1
        </div>
    )
}