import GenreCard from "../../generos/components/genreCard"


const genres = [
    { id: 1, name: "Pop", color: "from-pink-400 to-pink-600", icon: "🎤" },
    { id: 2, name: "Rock", color: "from-red-400 to-red-600", icon: "🎸" },
    { id: 3, name: "Jazz", color: "from-blue-400 to-blue-600", icon: "🎷" },
    { id: 4, name: "Electrónico", color: "from-purple-400 to-purple-600", icon: "🎹" },
    { id: 5, name: "Hip Hop", color: "from-yellow-400 to-yellow-600", icon: "🎵" },
    { id: 6, name: "Clásico", color: "from-amber-400 to-amber-600", icon: "🎻" },
]

export default function Genres() {
    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold text-foreground mb-6">Géneros Musicales</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {genres.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
        </section>
    )
}