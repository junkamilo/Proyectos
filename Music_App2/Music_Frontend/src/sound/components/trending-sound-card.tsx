import { useState } from "react"
import { Play } from "lucide-react"

interface TrendingSongCardProps {
    song: {
        id: number
        title: string
        artist: string
        image: string
    }
}

export default function TrendingSongCard({ song }: TrendingSongCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="flex-shrink-0 w-40 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative mb-3 overflow-hidden rounded-lg">
                <img
                    src={song.image || "/placeholder.svg"}
                    alt={song.title}
                    className={`w-full aspect-square object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                />
                {isHovered && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                        <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition">
                            <Play className="w-5 h-5 fill-primary-foreground" />
                        </button>
                    </div>
                )}
            </div>
            <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition">{song.title}</p>
            <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
        </div>
    )
}