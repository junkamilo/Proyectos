import type { Artista } from "./artistas.interfaces";

export interface ArtistasAPIResponse {
    error: boolean;
    code: number;
    message: string;
    data: Artista[];
}