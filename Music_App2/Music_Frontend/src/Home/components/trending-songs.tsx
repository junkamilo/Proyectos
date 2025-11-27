import TrendingSongCard from "../../sound/components/trending-sound-card"


const trendingSongs = [
    { id: 1, title: "Celestial Vibes", artist: "Aurora Brillante", image: "/trending-song-cover.jpg" },
    { id: 2, title: "Digital Horizons", artist: "Sonic Dreams", image: "/trending-music.png" },
    { id: 3, title: "Neon Nights", artist: "The Echoes", image: "/neon-music-cover.jpg" },
    { id: 4, title: "Luna Bruja", artist: "Luna Nocturna", image: "/moon-night-cover.jpg" },
    { id: 5, title: "Soul Connection", artist: "Melodía Fuerte", image: "/soul-music-cover.jpg" },
    { id: 6, title: "Harmony Waves", artist: "The Harmonics", image: "/harmony-music.jpg" },
]

export default function TrendingSongs() {
    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold text-foreground mb-6">Tendencias Ahora</h2>
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-4">
                    {trendingSongs.map((song) => (
                        <TrendingSongCard key={song.id} song={song} />
                    ))}
                </div>
            </div>
        </section>
    )
}