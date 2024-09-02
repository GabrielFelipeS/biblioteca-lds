import axios from "axios"

export const dominio = "http://localhost:8000"
const url = dominio + "/api/" as string;

export const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    }
});