export const loadView = async (elemento, ruta) => {
    try {
        // ✅ CORRECCIÓN: Quitamos "./src/views/"
        // Ahora usamos la ruta directa que viene del router (ej: "/Inicio/inicio.html")
        const response = await fetch(ruta);

        // Si el archivo no existe (404), lanzamos error para no pintar pantalla blanca
        if (!response.ok) {
            throw new Error(`No se pudo cargar la vista: ${ruta}`);
        }

        const html = await response.text();
        elemento.innerHTML = html;
        
    } catch (error) {
        console.error(error);
        elemento.innerHTML = "<h1>Error 404: No se encontró la página</h1>";
    }
}