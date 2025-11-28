export interface Artista {
    artista_id: number;
    nombre_artista: string;
    url_foto_artista: null | string;
}
export interface ArtistaDestacado {
    artista_id: number;
    nombre_artista: string;
    url_foto_artista: string | null;
    genero_id: number;
    nombre_genero: string;
    image: string;
}
