import api from '@/api/axios';
import axios from 'axios';

export const materos = axios.create({
    baseURL: `${ api }/AddProductos`
});