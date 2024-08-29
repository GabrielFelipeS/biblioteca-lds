export type Book = {
    id: string
    title: string
    author: string
    genre: string
    isbn: string
<<<<<<< HEAD
    year: number
    edition: string
    publisher: string
=======
    ano: number
    editora: string
    edicao: string
    imagem: File
>>>>>>> 8e2f87407c5465390b6239bc42490b6177cce86e
}

export const LivroEmpty = {
    title: "",
    autor: "",
    genero: "",
    isbn: "",
    ano: 0,
    editora: "",
    edicao: "",
    imagem: ''
}