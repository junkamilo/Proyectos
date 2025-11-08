const postProducto = async ({ Nombre, Tamaño, Precio, Cantidad }) => {
  try {
    const response = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre,
        Tamaño,
        Precio,
        Cantidad,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en postProducto:", error);
    throw error;
  }
};

export default postProducto;
