const getEspecificaciones = async () => {
    try {
        const response = await fetch("http://localhost:3001/Especificaciones");
        if (!response.ok) throw new Error("No se cargo las especificaciones");
        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error(error);
    }
}
export default getEspecificaciones;