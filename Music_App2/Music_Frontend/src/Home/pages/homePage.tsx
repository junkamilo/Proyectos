import { useEffect, useState } from "react";
import { getAllArtistas } from "../../artistas/actions/get-artistas";
import type { Artista } from "../../artistas/types/artistas.interfaces";
import PopularArtists from "../components/popular-artistas";
import PopularSongs from "../components/popular-songs";
import Genres from "../components/generes-musicales";
import TrendingSongs from "../components/trending-songs";

export const HomePage = () => {

  // 1. Estado para guardar la lista de artistas
  const [artistas, setArtistas] = useState<Artista[]>([]);

  // 2. Estado para manejar la carga (opcional pero recomendado)
  const [isLoading, setIsLoading] = useState(true);

  // 3. useEffect para hacer la petición UNA vez cuando el componente se monta
  useEffect(() => {
    const loadArtistas = async () => {
      try {
        const data = await getAllArtistas();
        setArtistas(data);
      } catch (error) {
        console.error("Error cargando artistas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArtistas();
  }, []); // El array vacío [] asegura que solo se ejecute al inicio

  if (isLoading) {
    return <div>Cargando artistas...</div>;
  }

  return (
    <div>
      <h1>Lista de Artistas</h1>
      <ul>
        {artistas.map((artista) => (
          <li key={artista.artista_id}>
            <p>{artista.nombre_artista}</p>
          </li>
        ))}
      </ul>

      <div className="space-y-12 px-4 md:px-8 lg:px-12 py-8">

        {/* Sección de Artistas Populares */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Artistas más escuchados</h2>
          <PopularArtists />
        </section>

        {/* Sección de Canciones Populares */}
        <PopularSongs />

        {/* Sección de Géneros */}
        <Genres />

        {/* Sección de Tendencias */}
        <TrendingSongs />

      </div>
    </div>
  )
}
