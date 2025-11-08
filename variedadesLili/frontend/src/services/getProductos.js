const getProductos = async () => {
    try {
        const response = await fetch("http://localhost:3001/productos");
        if (!response.ok) throw new Error("No se cargo los productos");
        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error(error);
    }
}
export default getProductos;