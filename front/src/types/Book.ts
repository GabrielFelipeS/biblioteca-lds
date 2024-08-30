export type Book = {
    id: string
    title: string
    author: string
    genre: string
    isbn: string
    year: number
    edition: string
    publisher: string
    image: File
}

export const LivroEmpty = {
    id: "",
    title: "",
    author: "",
    genre: "",
    isbn: "",
    year: 0,
    edition: "",
    publisher: "",
    image: new File([], '')
}