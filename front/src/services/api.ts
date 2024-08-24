import axios from "axios"

export const url = "http://localhost:80/api/" as string;

export const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    },
});