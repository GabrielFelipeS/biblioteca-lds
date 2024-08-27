export type Book = {
    title: string
    autor: string
    genero: string
    isbn: string
    ano: number
    editora: string
    edicao: string
    imagem: File
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