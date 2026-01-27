import API_URL from "../../utils/api";
const API_URL_PRODUCTOS = "/AddProductos/productos/"

//agregamos productos
export const agregarProductoService = async (formData) => {
  try {
    const res = await fetch(`${API_URL}${API_URL_PRODUCTOS}`, {
      method: "POST",
      body: formData,
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Error al agregar producto");
    }

    return responseData;
  } catch (error) {
    console.error("[agregarProductoService] Error:", error);
    throw error;
  }
};
//Traemos todos los productos
export const getAllProductosServices = async () => {
  try {
    const res = await fetch(`${API_URL}${API_URL_PRODUCTOS}`);
    const responseData = await res.json(); // <-- Primero obtienes el JSON

    if (!res.ok) {
      throw new Error(responseData.message || "Error al obtener productos");
    }

    return responseData;
  } catch (error) {
    console.error("[getAllProductosServices] Error:", error);
    throw error;
  }
};
//actualizamos un producto
export const updateProductoService = async (id, formData) => {
  try {
    const res = await fetch(`${API_URL}${API_URL_PRODUCTOS}${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error("Error al actualizar producto");

    return await res.json();
  } catch (error) {
    console.error("[updateProductoService] Error:", error);
    throw error;
  }
};
//eliminamos un producto
export const deleteProductoService = async (id) => {
  try {
    const res = await fetch(`${API_URL}${API_URL_PRODUCTOS}${id}`, {
      method: "DELETE",
    });

    const responseData = await res.json(); // igual que en los otros servicios

    if (!res.ok) {
      throw new Error(responseData.message || "Error al eliminar producto");
    }

    return responseData; // retornas lo que mande el backend
  } catch (error) {
    console.error("[deleteProductoService] Error:", error);
    throw error;
  }
};

