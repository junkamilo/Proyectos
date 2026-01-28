import api from '@/api/axios';
import axios from 'axios';

export const plantas = axios.create({
    baseURL: `${ api }/AddProductos`
});