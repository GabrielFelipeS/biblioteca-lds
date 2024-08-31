export type Book = {
    id: number
    title: string
    author: string
    genre: string
    isbn: string
    year: number
    edition: string
    publisher: string
    image: string
    file?: File
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
    image: "",
    file: new File([], '')
}