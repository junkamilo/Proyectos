import axios from "axios";

const API_URL = 'http://localhost:3000/api';
const SERVER_URL = 'http://localhost:3000';

// Interfaz para el Frontend
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
}

// 1. OBTENER CARRITO (GET)
export const getCartItemsAction = async (userId: string | number): Promise<CartItem[]> => {
    const response = await axios.get(`${API_URL}/car/${userId}`);

    // Mapeamos la data de la BD (snake_case) a la del Front (camelCase)
    return response.data.data.map((item: any) => ({
        id: item.id_producto,
        name: item.nombre_producto,
        price: Number(item.precio), // Convertir string decimal a number
        // Construimos la URL absoluta de la imagen
        image: item.url_foto_producto
            ? (item.url_foto_producto.startsWith('http') ? item.url_foto_producto : `${SERVER_URL}${item.url_foto_producto}`)
            : "/placeholder.svg",
        category: "General", // O item.categoria si lo traes en el JOIN
        quantity: item.cantidad
    }));
};

// 2. ELIMINAR ITEM (DELETE)
export const removeCartItemAction = async ({ userId, productId }: { userId: string | number, productId: number }) => {
    // Nota: Ajusta la URL según cómo definiste tu ruta DELETE en el backend
    // Si era: router.delete("/:id_cliente/:id_producto", ...)
    const response = await axios.delete(`${API_URL}/car/${userId}/${productId}`);
    return response.data;
};

// 3. ACTUALIZAR CANTIDAD (PUT)
export const updateCartQuantityAction = async ({ userId, productId, quantity }: { userId: string | number, productId: number, quantity: number }) => {
    const response = await axios.put(`${API_URL}/Cart/update`, {
        id_cliente: userId,
        id_producto: productId,
        cantidad: quantity
    });
    return response.data;
};