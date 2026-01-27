import API_URL from "../../utils/api";

export const getAllclientes = async () => {
  try {
    const res = await fetch(`${API_URL}/api/all`);
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