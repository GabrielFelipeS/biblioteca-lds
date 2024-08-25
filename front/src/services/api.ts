import axios from "axios"

export const url = "http://localhost:8000/api/" as string;

export const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    },
});