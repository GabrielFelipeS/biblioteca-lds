export type Book = {
    id: number
    title: string
    author: string
    genre: string
    isbn: string
    year: string
    edition: string
    publisher: string
    image: string
    file: File
}

export const LivroEmpty = {
    id: 0,
    title: "",
    author: "",
    genre: "",
    isbn: "",
    year: "",
    edition: "",
    publisher: "",
    image: "",
    file: new File([], '')
}