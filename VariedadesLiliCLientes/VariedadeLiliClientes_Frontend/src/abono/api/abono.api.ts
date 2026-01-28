import api from '@/api/axios';
import axios from 'axios';

export const abono = axios.create({
    baseURL: `${ api }/AddProductos`
});