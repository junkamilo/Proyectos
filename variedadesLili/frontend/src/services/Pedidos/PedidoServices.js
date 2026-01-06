const API_URL_ALL_PEDIDOS = "http://localhost:3000/api/pedido/dashboard_todos";
const API_URL_ESTADO_PEDIDOS = "http://localhost:3000/api/pedido/enviar/";

export const getAllPedidosServices = async () => {
  try {
    const res = await fetch(API_URL_ALL_PEDIDOS);
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || "Error al obtener productos");
    }

    // --- CORRECCIÓN AQUÍ ---
    // Antes devolvías 'responseData' (el objeto completo).
    // Ahora devolvemos 'responseData.data' (el array de pedidos).
    return responseData.data;
  } catch (error) {
    console.error("[getAllPedidosServices] Error:", error);
    // Es buena práctica devolver un array vacío si falla, para que el .forEach del frontend no rompa la página
    return [];
  }
};

// Función limpia: Recibe ID -> Devuelve Datos
export const postEstadosPedidoServices = async (idPedido) => {
  // Limpiamos el ID (quitamos el "ORD-" si viene con él)
  const idLimpio = idPedido.replace("ORD-", "");

  try {
    const response = await fetch(`${API_URL_ESTADO_PEDIDOS}${idLimpio}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result; // Retornamos la respuesta al componente
  } catch (error) {
    console.error("Error en servicio postEstadosPedido:", error);
    // Retornamos un objeto de error controlado
    return { status: "error", message: "Error de conexión con el servidor" };
  }
};
