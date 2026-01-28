import api from "@/api/axios";
import axios from "axios";

export const pedidosApi = axios.create({
    baseURL: `${ api }/api/pedido/`
});