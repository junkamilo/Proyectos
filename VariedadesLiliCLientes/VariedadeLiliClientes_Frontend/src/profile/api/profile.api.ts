import api from '@/api/axios';
import axios from 'axios';

export const profileApi = axios.create({
    baseURL: `${ api }/api`
});