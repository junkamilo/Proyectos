import SongRow from "../../sound/components/sound-rows"

const songs = [
    { id: 1, title: "Noches Starlight", artist: "Aurora Brillante", cover: "/abstract-album-cover.png", plays: "2.3M" },
    { id: 2, title: "Echo del Corazón", artist: "The Echoes", cover: "/abstract-soundscape.png", plays: "1.9M" },
    { id: 3, title: "Midnight Dreams", artist: "Luna Nocturna", cover: "/night-music-cover.jpg", plays: "1.8M" },
    { id: 4, title: "Vibraciones Digitales", artist: "Sonic Dreams", cover: "/electronic-music-cover.png", plays: "1.6M" },
    { id: 5, title: "Ritmo Infinito", artist: "Melodía Fuerte", cover: "/rhythm-music-cover.jpg", plays: "1.4M" },
]

export default function PopularSongs() {
    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold text-foreground mb-6">Canciones Populares</h2>
            <div className="space-y-2">
                {songs.map((song) => (
                    <SongRow key={song.id} song={song} />
                ))}
            </div>
        </section>
    )
}