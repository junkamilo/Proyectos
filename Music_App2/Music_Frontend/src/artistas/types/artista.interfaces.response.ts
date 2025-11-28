import type { Artista } from "./artistas.interfaces";

export interface ArtistasAPIResponse {
    error: boolean;
    code: number;
    message: string;
    data: Artista[];
}

export interface DestacadosAPIResponse {
    error: boolean;
    code: number;
    message: string;
    data: {
        artista_id: number;
        nombre_artista: string;
        url_foto_artista: string | null;
        genero_id: number;      // <--- IMPORTANTE: TypeScript necesita ver esto aquí
        nombre_genero: string;  // <--- Y esto
    }[];
}