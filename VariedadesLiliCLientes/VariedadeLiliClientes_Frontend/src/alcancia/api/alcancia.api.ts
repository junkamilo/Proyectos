import api from '@/api/axios';
import axios from 'axios';

export const alcancia = axios.create({
    baseURL: `${ api }/AddProductos`
});