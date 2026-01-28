import api from "@/api/axios";
import axios from "axios";

export const addToCartAction = async ({ 
    id_cliente, 
    id_producto, 
    cantidad 
}: { 
    id_cliente: string | number, 
    id_producto: string | number, 
    cantidad: number 
}) => {
    
    // Petición POST al endpoint que creamos y probamos en Postman
    const response = await axios.post(`${api}/api/car/add`, {
        id_cliente,
        id_producto,
        cantidad
    });

    return response.data;
};