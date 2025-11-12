const API_URL = "http://localhost:3000/AddProductos/productos";

export const agregarProductoService = async (formData) => {
  try {
    const res = await fetch(API_URL, {
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
