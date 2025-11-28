import PopularSongs from "../components/popular-songs";
import Genres from "../components/generes-musicales";
import TrendingSongs from "../components/trending-songs";
import { PopularArtists } from "../components/popular-artistas";

export const HomePage = () => {

  return (
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
  )
}
