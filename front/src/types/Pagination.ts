
type Link = {
    url: string
    label: string
    active: boolean
};

export type PaginationType = {
    current_page: string
    first_page_url: string
    from: string
    last_page: string
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
};

export const DefaultPagination: PaginationType = {
    current_page: "1",
    first_page_url: "",
    from: "1",
    last_page: "1",
    last_page_url: "",
    links: [],
    next_page_url: "",
    path: "",
    per_page: 10,
    prev_page_url: "",
    to: 10,
    total: 0
};