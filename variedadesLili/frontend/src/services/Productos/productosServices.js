const API_URL_ADD_PRODUCTOS = "http://localhost:3000/AddProductos/productos";
const API_URL_GET_PRODUCTOS =
  "http://localhost:3000/AddProductos/GetAllproductos";

//agregamos productos
export const agregarProductoService = async (formData) => {
  try {
    const res = await fetch(API_URL_ADD_PRODUCTOS, {
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
    const res = await fetch(API_URL_GET_PRODUCTOS);

    if (!res.ok) throw new Error(responseData.message || "Error al agregar producto");

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error("[getAllProductosServices] Error:", error);
    throw error;
  }
};
