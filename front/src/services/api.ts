import axios from "axios"

export const url = "http://localhost:8000/api/" as string;

const config = {
    headers: {'Content-Type': 'application/json'}
};

export const api = axios.create({
    baseURL: url,
    config
});