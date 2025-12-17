const API_URL_GET_CLIENTES = "http://localhost:3000/api/all";

export const getAllclientes = async () => {
  try {
    const res = await fetch(API_URL_GET_CLIENTES);
    const responseData = await res.json(); // <-- Primero obtienes el JSON

    if (!res.ok) {
      throw new Error(responseData.message || "Error al obtener productos");
    }

    return responseData;
  } catch (error) {
    console.error("[getAllClientes] Error:", error);
    throw error;
  }
};