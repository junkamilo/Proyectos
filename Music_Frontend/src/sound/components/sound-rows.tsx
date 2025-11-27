import { useState } from "react"
import { Heart, Play } from "lucide-react"

interface SongRowProps {
  song: {
    id: number
    title: string
    artist: string
    cover: string
    plays: string
  }
}

export default function SongRow({ song }: SongRowProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-card transition cursor-pointer">
      <img src={song.cover || "/placeholder.svg"} alt={song.title} className="w-12 h-12 rounded object-cover" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate group-hover:text-primary transition">{song.title}</p>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
      </div>
      <div className="hidden md:block text-sm text-muted-foreground">{song.plays}</div>
      <button className="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-primary/10 rounded-full">
        <Play className="w-4 h-4 text-primary fill-primary" />
      </button>
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-primary/10 rounded-full"
      >
        <Heart className={`w-4 h-4 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      </button>
    </div>
  )
}

