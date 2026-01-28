import api from '@/api/axios';
import axios from 'axios';

export const clienteApi = axios.create({
    baseURL: `${api}/api`
});