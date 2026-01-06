import axios from "axios";

// Asegúrate de que apunte a tu backend
const API_URL = 'http://localhost:3000/api';

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
    const response = await axios.post(`${API_URL}/car/add`, {
        id_cliente,
        id_producto,
        cantidad
    });

    return response.data;
};