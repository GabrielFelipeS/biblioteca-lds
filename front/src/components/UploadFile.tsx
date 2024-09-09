import { ChangeEvent } from "react"
import input_file from "/src/assets/file.png";
import upload_success from "/src/assets/file-upload-success.png";
import { Book } from "../types/Book";

interface UploadFileProps {
    book: Book
    handleImage: (event: ChangeEvent<HTMLInputElement>) => void
}

export function UploadFile({book, handleImage}: UploadFileProps) {
    const haveName = book.file?.name;
    const haveImage = book.image;

    return (
        <>
            <label htmlFor={"input-file"}
                className={`
                        flex justify-center 
                        bg-ligth-button rounded-full 
                        pt-2 pb-2 mb-6`}>

                <div className={" justify-center mr-2 ml-7 hidden md:flex"}>
                    {(haveName || haveImage)? "Upload realizado" : "Fazer upload"}
                </div>
                <img src={(haveName || haveImage)? upload_success : input_file} className={"h-6 w-7"} alt={"input file"} />
                <input id={"input-file"} type={"file"} className={"absolute -z-10"} accept=".jpg, .jpeg, .png, .webp"
                onChange={handleImage} required={!(haveName || haveImage)}
            />
            </label>

           

        </>
    )
}