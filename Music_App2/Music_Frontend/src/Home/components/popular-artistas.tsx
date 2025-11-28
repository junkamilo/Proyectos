import ArtistCard from "../../artistas/components/artist-card"
import { getDestacadoArtistas } from "../../artistas/actions/get-artistas";
import { useQuery } from "@tanstack/react-query";


export const PopularArtists = () => {
    
    const { data: artistas, isLoading, isError } = useQuery({
        queryKey: ['artistasDestacados'], // Identificador único para la caché
        queryFn: getDestacadoArtistas,    // Tu función que retorna la promesa
        staleTime: 1000 * 60 * 5,         // (Opcional) La data no vence por 5 minutos
    });

    if (isLoading) return <div className="p-4">Cargando...</div>;
    if (isError) return <div className="p-4">Error al cargar datos</div>;

    // Nota: 'artistas' puede ser undefined mientras carga, aseguramos que sea array o fallback
    const listaArtistas = artistas || [];

    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold mb-6">Artistas Populares</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {listaArtistas.map((artist) => (
                    <ArtistCard key={artist.artista_id} artist={artist} />
                ))}
            </div>
        </section>
    )
}