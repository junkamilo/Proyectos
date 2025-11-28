import { Artistas } from "../api/artistas.api";
import type { ArtistasAPIResponse, DestacadosAPIResponse } from "../types/artista.interfaces.response";
import type { ArtistaDestacado } from "../types/artistas.interfaces";


const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllArtistas = async () => {
    //Tipamos la respuesta de Axios con nuestra interfaz
    const { data: apiResponse } = await Artistas.get<ArtistasAPIResponse>('/artistas');

    // Accedemos al array real.
    // apiResponse = todo el objeto JSON
    // apiResponse.data = el array de artistas
    const listaArtistas = apiResponse.data;

    //Mapeamos para arreglar las imágenes
    return listaArtistas.map(artista => {

        let imagenFinal = '';

        // Si tiene foto y NO es una cadena vacía
        if (artista.url_foto_artista && artista.url_foto_artista !== "") {
            // Concatenamos la URL base con la ruta que viene de la BD
            // Ejemplo: http://localhost:3000/imagenes/foto.jpg
            imagenFinal = `${BASE_URL}${artista.url_foto_artista}`;
        } else {
            // Si es null o "", usamos tu lógica de respaldo (buscar por nombre)
            // O podrías poner una imagen por defecto (placeholder)
            imagenFinal = `${BASE_URL}/images/${artista.nombre_artista}`;
        }

        return {
            ...artista,
            image: imagenFinal
        };
    });
}

export const getDestacadoArtistas = async (): Promise<ArtistaDestacado[]> => {

    // AQUI ESTABA EL ERROR: Cambiamos <ArtistasAPIResponse> por <DestacadosAPIResponse>
    const { data: apiResponse } = await Artistas.get<DestacadosAPIResponse>('/artistas/destacados');

    const listaArtistas = apiResponse.data;

    return listaArtistas.map(artista => {

        let imagenFinal = '';

        if (artista.url_foto_artista && artista.url_foto_artista !== "") {
            imagenFinal = `${BASE_URL}${artista.url_foto_artista}`;
        } else {
            imagenFinal = `${BASE_URL}/images/${artista.nombre_artista}`;
        }

        return {
            ...artista,      // Ahora TS sabe que aquí van incluidos genero_id y nombre_genero
            image: imagenFinal
        };
    });
}