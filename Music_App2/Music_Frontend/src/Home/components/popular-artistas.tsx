import ArtistCard from "../../artistas/components/artist-card"


const artists = [
    { id: 1, name: "Aurora Brillante", image: "/female-artist-portrait.png" },
    { id: 2, name: "The Echoes", image: "/band-music.jpg" },
    { id: 3, name: "Luna Nocturna", image: "/woman-singing.jpg" },
    { id: 4, name: "Sonic Dreams", image: "/musician-performing.png" },
    { id: 5, name: "Melodía Fuerte", image: "/artist-on-stage.jpg" },
    { id: 6, name: "The Harmonics", image: "/diverse-music-group.png" },
]

export default function PopularArtists() {
    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold text-foreground mb-6">Artistas Populares</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </section>
    )
}