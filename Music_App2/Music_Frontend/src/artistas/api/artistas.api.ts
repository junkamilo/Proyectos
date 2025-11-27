import axios from 'axios';

//instanciamos la url del la url que esta en el .env
const BASE_URL = import.meta.env.VITE_API_URL;

export const Artistas = axios.create({
    baseURL: `${BASE_URL}`
});